import mongoose from "mongoose";
import { BadRequestError } from "@common/errors/badRequest.error.js";
export class FollowService {
    followRepo;
    profileRepo;
    constructor(followRepo, profileRepo) {
        this.followRepo = followRepo;
        this.profileRepo = profileRepo;
    }
    async isFollowed(userId, profileId) {
        // ensure target exists
        const profile = await this.profileRepo.findById(profileId);
        if (!profile) {
            throw new BadRequestError("Target user not found");
        }
        const targetUserId = profile.userId.toString();
        const already = await this.followRepo.exists(userId, targetUserId);
        if (!already) {
            return {
                isFollowed: false,
            };
        }
        return {
            isFollowed: true,
        };
    }
    async follow(userId, profileId) {
        // ensure target exists
        const profile = await this.profileRepo.findById(profileId);
        if (!profile) {
            throw new BadRequestError("Target user not found");
        }
        const targetUserId = profile.userId.toString();
        if (userId === targetUserId) {
            throw new BadRequestError("You cannot follow yourself");
        }
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const already = await this.followRepo.exists(userId, targetUserId);
            if (already)
                return; // idempotent
            await this.followRepo.create(userId, targetUserId, session);
            // increment counts
            await this.profileRepo.incrementFollowingCount(userId, session);
            await this.profileRepo.incrementFollowersCount(targetUserId, session);
            await session.commitTransaction();
        }
        catch (err) {
            await session.abortTransaction();
            throw err;
        }
        finally {
            session.endSession();
        }
    }
    async unfollow(userId, profileId) {
        // ensure target exists
        const profile = await this.profileRepo.findById(profileId);
        if (!profile) {
            throw new BadRequestError("Target user not found");
        }
        const targetUserId = profile.userId.toString();
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const exists = await this.followRepo.exists(userId, targetUserId);
            if (!exists)
                return; // idempotent
            await this.followRepo.delete(userId, targetUserId, session);
            await this.profileRepo.decrementFollowingCount(userId, session);
            await this.profileRepo.decrementFollowersCount(targetUserId, session);
            await session.commitTransaction();
        }
        catch (err) {
            await session.abortTransaction();
            throw err;
        }
        finally {
            session.endSession();
        }
    }
}
//# sourceMappingURL=follow.service.js.map