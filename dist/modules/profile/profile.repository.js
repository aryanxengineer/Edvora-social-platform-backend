import { ProfileModel } from "./profile.model.js";
export class ProfileRepository {
    async findById(profileId) {
        return ProfileModel.findById(profileId);
    }
    async findByUserId(userId) {
        return ProfileModel.findOne({ userId }).lean();
    }
    async create(data) {
        return ProfileModel.create(data);
    }
    async incrementPostCount(profileId) {
        return ProfileModel.updateOne({ _id: profileId }, { $inc: { postCounts: 1 } });
    }
    async decrementPostCount(profileId) {
        return ProfileModel.updateOne({ _id: profileId }, { $inc: { postCounts: -1 } });
    }
    async incrementFollowersCount(userId, session) {
        return ProfileModel.updateOne({ userId }, { $inc: { followersCount: 1 } }, { session });
    }
    async decrementFollowersCount(userId, session) {
        return ProfileModel.updateOne({ userId }, { $inc: { followersCount: -1 } }, { session });
    }
    async incrementFollowingCount(userId, session) {
        return ProfileModel.updateOne({ userId }, { $inc: { followingCount: 1 } }, { session });
    }
    async decrementFollowingCount(userId, session) {
        return ProfileModel.updateOne({ userId }, { $inc: { followingCount: -1 } }, { session });
    }
    async searchQuery(search) {
        return ProfileModel.find({
            username: { $regex: search }
        }).select("_id username avatar").limit(10);
    }
}
//# sourceMappingURL=profile.repository.js.map