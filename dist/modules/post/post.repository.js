import { PostModel } from "./post.model.js";
export class PostRepository {
    async createPost(data, session) {
        return PostModel.create([data]).then((res) => res[0]);
    }
    async findProfilePosts(profileId) {
        return PostModel.find({ profileId }).select("_id profileId image").lean();
    }
    async findById(postId) {
        return PostModel.findById(postId).lean();
    }
    async deleteById(postId, session) {
        return PostModel.deleteOne({ _id: postId });
    }
    async incrementLikeCount(postId, session) {
        return PostModel.updateOne({ _id: postId }, { $inc: { likesCount: 1 },
        }, { session });
    }
    async decrementLikeCount(postId, session) {
        return PostModel.updateOne({ _id: postId }, { $inc: { likesCount: -1 } }, { session });
    }
    async find(profileId) {
        return PostModel.find({ profileId: { $ne: profileId } }).limit(10);
    }
    async findByProfileId(followingIds) {
        return PostModel.find({
            profileId: { $in: followingIds },
        });
    }
}
//# sourceMappingURL=post.repository.js.map