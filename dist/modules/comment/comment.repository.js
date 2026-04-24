import mongoose from "mongoose";
import CommentModel from "./comment.model.js";
export class CommentRepository {
    constructor() { }
    create = async (postId, content, userId) => {
        return await CommentModel.create({
            postId,
            content,
            userId,
        });
    };
    getComments = async (postId) => {
        return await CommentModel.find({ postId }).limit(5);
    };
    find = async (postId) => {
        return await CommentModel.find({ postId }).select("_id").lean();
    };
    deleteById = async (commentId) => {
        return await CommentModel.findByIdAndDelete(commentId);
    };
    async getCommentsCountByPostIds(postIds) {
        const objectPostIds = postIds.map((id) => new mongoose.Types.ObjectId(id));
        const result = await CommentModel.aggregate([
            {
                $match: {
                    postId: { $in: objectPostIds }, // ✅ FIX
                },
            },
            {
                $group: {
                    _id: "$postId",
                    count: { $sum: 1 },
                },
            },
        ]);
        return new Map(result.map((item) => [item._id.toString(), item.count]));
    }
}
//# sourceMappingURL=comment.repository.js.map