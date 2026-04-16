import mongoose from "mongoose";
import CommentModel from "./comment.model.js";

export class CommentRepository {
  constructor() {}

  public create = async (postId: string, content: string, userId: string) => {
    return await CommentModel.create({
      postId,
      content,
      userId,
    });
  };

  public getComments = async (postId: string) => {
    return await CommentModel.find({ postId }).limit(5);
  };

  public find = async (postId: string) => {
    return await CommentModel.find({ postId }).select("_id").lean();
  };

  public deleteById = async (commentId: string) => {
    return await CommentModel.findByIdAndDelete(commentId);
  };

  async getCommentsCountByPostIds(postIds: string[]) {
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
