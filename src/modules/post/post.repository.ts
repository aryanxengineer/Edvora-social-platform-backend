import type { RequestedPostData } from "./post.types.js";
import type { Types } from "mongoose";

import { BadRequestError } from "@common/errors/badRequest.error.js";
import { UserModel } from "@modules/user/user.model.js";
import { PostModel } from "./post.model.js";
import type { UploadApiResponse } from "cloudinary";

export class PostRepository {
  constructor() {}

  public async saveCreatedPost(
    userId: string,
    data: RequestedPostData,
    cloudinaryResult : UploadApiResponse,
  ): Promise<void> {
    // Logic to save the created post to the database
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new BadRequestError("Invalid user ID");
    }

    // Here you would typically create and save the post using your PostModel
    const post = await PostModel.create({
      authorId: userId,
      image: {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
      },
      caption: data?.caption || "",
    });

    post.mentions.push(user._id);
    post.hashtags.push(...(data.hashtags || []));

    await post.save();

    return;
  }
}
