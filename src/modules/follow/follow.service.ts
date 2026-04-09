import mongoose from "mongoose";
import { FollowRepository } from "./follow.repository.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";

export class FollowService {
  constructor(
    private followRepo: FollowRepository,
    private profileRepo: ProfileRepository
  ) {}

  async follow(userId: string, targetUserId: string) {
    if (userId === targetUserId) {
      throw new BadRequestError("You cannot follow yourself");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const already = await this.followRepo.exists(userId, targetUserId);
      if (already) return; // idempotent

      // ensure target exists
      const targetProfile = await this.profileRepo.findByUserId(targetUserId);
      if (!targetProfile) {
        throw new BadRequestError("Target user not found");
      }

      await this.followRepo.create(userId, targetUserId, session);

      // increment counts
      await this.profileRepo.incrementFollowingCount(userId, session);
      await this.profileRepo.incrementFollowersCount(targetUserId, session);

      await session.commitTransaction();

    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

  async unfollow(userId: string, targetUserId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const exists = await this.followRepo.exists(userId, targetUserId);
      if (!exists) return; // idempotent

      await this.followRepo.delete(userId, targetUserId, session);

      await this.profileRepo.decrementFollowingCount(userId, session);
      await this.profileRepo.decrementFollowersCount(targetUserId, session);

      await session.commitTransaction();

    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }
}