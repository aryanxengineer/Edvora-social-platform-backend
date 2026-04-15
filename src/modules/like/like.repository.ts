import mongoose from "mongoose";
import LikeModel from "./like.model.js";
import { ILike } from "./like.types.js";

export class LikeRepository {
  async createLike(
    userId: string,
    postId: string,
    session?: mongoose.ClientSession,
  ) {
    return LikeModel.create([{ userId, postId }], { session }).then(
      (r) => r[0],
    );
  }

  async deleteLike(
    userId: string,
    postId: string,
    session?: mongoose.ClientSession,
  ) {
    return LikeModel.deleteOne({ userId, postId }, { session });
  }

  async exists(userId: string, postId: string) {
    return LikeModel.exists({ userId, postId });
  }

  async find(postId: string): Promise<ILike[] | []> {
    return LikeModel.find({
      postId,
    });
  }

  async findByUserAndPostIds(userId: string, postIds: string[]) {
    return LikeModel.find({
      userId,
      postId: { $in: postIds },
    }).select("postId");
  }
}
