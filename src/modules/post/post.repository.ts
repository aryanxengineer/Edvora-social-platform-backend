import { BadRequestError } from "@common/errors/badRequest.error.js";
import { UserModel } from "@modules/user/user.model.js";
import { PostModel } from "./post.model.js";
import type { UploadApiResponse } from "cloudinary";
import type { NewPostDataType } from "./post.schema.js";
import { deleteAsset } from "@config/cloudinary.js";

export class PostRepository {
  public async saveCreatedPost(
    userId: string,
    data: NewPostDataType,
    cloudinaryResult: UploadApiResponse,
  ) {
    try {
      const user = await UserModel.findById(userId).select("username");

      if (!user) {
        throw new BadRequestError("Invalid userId");
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
        authorId: userId,
        authorUsernameSnapshot: user.username,
        image: {
          url: cloudinaryResult.secure_url,
          publicId: cloudinaryResult.public_id,
        },
        caption: data.caption ?? "",
        visibility: data.visibility || "public",
        hashtags,
        mentions,
      });

      return post;
    } catch (error) {
      await deleteAsset(cloudinaryResult.public_id);
      throw error;
    }
  }
}
