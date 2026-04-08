import mongoose from "mongoose";
import { ProfileModel } from "./profile.model.js";

export class ProfileRepository {
  async findByUserId(userId: string) {
    return ProfileModel.findOne({ userId }).lean();
  }

  async create(data: any) {
    return ProfileModel.create(data);
  }

  async incrementPostCount(
    profileId: string,
  ) {
    return ProfileModel.updateOne(
      { _id: profileId },
      { $inc: { postCounts: 1 } }
    );
  }

  async decrementPostCount(
    profileId: string,
  ) {
    return ProfileModel.updateOne(
      { _id: profileId },
      { $inc: { postCounts: -1 } },
    );
  }
}
