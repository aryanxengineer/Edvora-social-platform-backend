import { FollowModel } from "./follow.model.js";
export class FollowRepository {
    async create(followerId, followingId, session) {
        return FollowModel.create([{ followerId, followingId }], { session }).then((r) => r[0]);
    }
    async delete(followerId, followingId, session) {
        return FollowModel.deleteOne({ followerId, followingId }, { session });
    }
    async exists(followerId, followingId) {
        return FollowModel.exists({ followerId, followingId });
    }
    async find(userId) {
        return FollowModel.find({ followerId: { $eq: userId } }).select("followingId");
    }
}
//# sourceMappingURL=follow.repository.js.map