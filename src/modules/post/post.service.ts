import mongoose from "mongoose";
import { PostRepository } from "./post.repository.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { NewPostDataType } from "./post.schema.js";
import { deleteAsset, uploadFromBuffer } from "@config/cloudinary.js";
import { NotFoundError } from "@common/errors/notFound.error.js";
import { InternalServerError } from "@common/errors/internal.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";

export class PostService {
  constructor(
    private postRepo: PostRepository,
    private profileRepo: ProfileRepository,
  ) {}

  async createPost(
    userId: string,
    data: NewPostDataType,
    file: Express.Multer.File,
  ) {
    let uploaded: any;

    try {
      // 1. upload image
      uploaded = await uploadFromBuffer(file.buffer, {
        resource_type: "image",
      });

      if (!uploaded) {
        throw new InternalServerError("Image upload failed");
      }

      // 2. get profile
      const profile = await this.profileRepo.findByUserId(userId);
      if (!profile) {
        throw new BadRequestError("Profile not found");
      }

      // 3. normalize data
      const hashtags = [
        ...new Set((data.tags || []).map((t) => t.toLowerCase())),
      ];
      const mentions = [...new Set(data.mentions || [])];

      // 4. create post
      const post = await this.postRepo.createPost({
        profileId: profile._id,
        authorUsernameSnapshot: profile.username,
        authorAvatar: profile.avatar,
        image: {
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
        },
        caption: data.caption ?? "",
        title: data.title ?? "",
        visibility: data.visibility || "public",
        hashtags,
        mentions,
      });

      // 5. update profile count
      await this.profileRepo.incrementPostCount(profile._id);

      return post;
    } catch (err) {
      // rollback cloudinary
      if (uploaded?.public_id) {
        await deleteAsset(uploaded.public_id);
      }

      throw err;
    }
  }

  async getPostById(postId: string) {
    const post = await this.postRepo.findById(postId);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    return post;
  }

  async getProfilePosts(profileId: string) {

    const profile = await this.profileRepo.findById(profileId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    const posts = await this.postRepo.findProfilePosts(profileId);

    if (!posts) {
      throw new NotFoundError("Post not found");
    }

    return posts;
  }

  async deletePost(postId: string) {
    try {
      const post = await this.postRepo.findById(postId);

      if (!post) {
        throw new NotFoundError("Post not found");
      }

      await this.postRepo.deleteById(postId);

      await this.profileRepo.decrementPostCount(post.profileId as unknown as string);

      // external side-effect AFTER DB success
      try {
        await deleteAsset(post.image.publicId);
      } catch (err) {
        console.error("Cloudinary delete failed", err);
      }
    } catch (err) {
      throw new Error();
    }
  }
}
