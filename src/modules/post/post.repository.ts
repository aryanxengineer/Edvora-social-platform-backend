import type { UploadApiResponse } from "cloudinary";
import type { NewPostDataType } from "./post.schema.js";

import { InternalServerError } from "@common/errors/internal.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";

import { ProfileModel } from "@modules/profile/profile.model.js";
import { PostModel } from "./post.model.js";

import { deleteAsset } from "@config/cloudinary.js";

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
}
