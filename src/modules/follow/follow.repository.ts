import mongoose from "mongoose";
import { FollowModel } from "./follow.model.js";

export class FollowRepository {
  async create(
    followerId: string,
    followingId: string,
    session?: mongoose.ClientSession,
  ) {
    return FollowModel.create([{ followerId, followingId }], { session }).then(
      (r) => r[0],
    );
  }

  async delete(
    followerId: string,
    followingId: string,
    session?: mongoose.ClientSession,
  ) {
    return FollowModel.deleteOne({ followerId, followingId }, { session });
  }

  async exists(followerId: string, followingId: string) {
    return FollowModel.exists({ followerId, followingId });
  }

  async find(userId: string) {
    return FollowModel.find({ followerId: { $eq: userId } }).select(
      "followingId",
    );
  }
}
