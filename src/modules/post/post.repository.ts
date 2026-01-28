import { BadRequestError } from "@/common/errors/badRequest.error.js";
import { UserModel } from "../user/user.model.js";
import type { RequestedPostData } from "./post.types.js";
import { PostModel } from "./post.model.js";
import type { Types } from "mongoose";

export class PostRepository {
  constructor() {}

  public async saveCreatedPost(
    data: RequestedPostData,
    url: string,
  ): Promise<void> {
    // Logic to save the created post to the database
    const user = await UserModel.findById(data.userId);
    if (!user) {
      throw new BadRequestError("Invalid user ID");
    }

    // Here you would typically create and save the post using your PostModel
    const post = await PostModel.create({
      authorId: data.userId,
      imageUrl: url,
      caption: data.caption || "",
    });

    post.mentions.push(user._id);
    post.hashtags.push(...(data.hashtags || []));

    await post.save();

    if (!user.posts) {
      user.posts = [];
    }

    user.posts.push(post._id as Types.ObjectId);
    await user.save();

    return;
  }
}
