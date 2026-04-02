import type { UploadApiResponse } from "cloudinary";
import type { NewPostDataType } from "./post.schema.js";

import { InternalServerError } from "@common/errors/internal.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";

import { ProfileModel } from "@modules/profile/profile.model.js";
import { PostModel } from "./post.model.js";

import { deleteAsset } from "@config/cloudinary.js";
import { NotFoundError } from "@common/errors/notFound.error.js";

import mongoose from "mongoose";

export class PostRepository {
  public async saveCreatedPost(
    userId: string,
    data: NewPostDataType,
    cloudinaryResult: UploadApiResponse,
  ) {
    try {
      const profile = await ProfileModel.findOne({ userId }).select({
        _id: 1,
        username: 1,
      });

      if (!profile) {
        throw new BadRequestError("Profile not found: Invalid userId");
      }

      const normalizeArray = (value: any) => {
        if (!value) return [];
        return Array.isArray(value) ? value : [value];
      };

      const hashtags = [
        ...new Set(
          normalizeArray(data.tags).map((tag: string) =>
            tag.trim().toLowerCase(),
          ),
        ),
      ];

      const mentions = [
        ...new Set(normalizeArray(data.mentions).map((m: string) => m.trim())),
      ];

      const post = await PostModel.create({
        profileId: profile._id,
        authorUsernameSnapshot: profile.username,
        image: {
          url: cloudinaryResult.secure_url,
          publicId: cloudinaryResult.public_id,
        },
        caption: data.caption ?? "",
        title: data.title ?? "",
        visibility: data.visibility || "public",
        hashtags,
        mentions,
      });

      if (!post) {
        throw new InternalServerError(
          "Internal Server Error: Post uploading failed",
        );
      }

      const updatedProfile = await ProfileModel.findOneAndUpdate(
        { userId },
        { $inc: { postCounts: 1 } },
        { new: true },
      );

      if (!updatedProfile) {
        console.error("Profile not found, increment failed");
      }

      return post;
    } catch (error) {
      await deleteAsset(cloudinaryResult.public_id);
      throw new InternalServerError("Post Creation failed: Try again");
    }
  }

  public async getPostById(postId: string) {
    const post = await PostModel.findById(postId);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    return post;
  }

  public async deletePost(postId: string) {
    // 1. Fetch post first
    const post = await PostModel.findById(postId);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    // 2. Delete post FIRST (source of truth)
    const deleteResult = await PostModel.deleteOne({ _id: postId });

    if (deleteResult.deletedCount === 0) {
      throw new InternalServerError("Post deletion failed");
    }

    // 3. Update profile count (best-effort)
    const profile = await ProfileModel.findOneAndUpdate(
      { _id: post.profileId },
      { $inc: { postCounts: -1 } },
      { new: true },
    );

    if (!profile) {
      // Don't fail request — log instead (important design decision)
      console.error("Profile not found while decrementing post count", {
        profileId: post.profileId,
      });
    }

    // 4. Delete asset (external side-effect)
    try {
      await deleteAsset(post.image.publicId);
    } catch (error) {
      // Never break API because of external failure
      console.error("Asset deletion failed", error);
    }

    return;
  }
}
