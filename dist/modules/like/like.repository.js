import LikeModel from "./like.model.js";
export class LikeRepository {
    async createLike(userId, postId, session) {
        return LikeModel.create([{ userId, postId }], { session }).then((r) => r[0]);
    }
    async deleteLike(userId, postId, session) {
        return LikeModel.deleteOne({ userId, postId }, { session });
    }
    async exists(userId, postId) {
        return LikeModel.exists({ userId, postId });
    }
    async find(postId) {
        return LikeModel.find({
            postId,
        });
    }
    async findByUserAndPostIds(userId, postIds) {
        return LikeModel.find({
            userId,
            postId: { $in: postIds },
        }).select("postId");
    }
}
//# sourceMappingURL=like.repository.js.map