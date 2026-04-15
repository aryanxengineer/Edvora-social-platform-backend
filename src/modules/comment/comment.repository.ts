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

  public deleteById = async (commentId: string) => {
    return await CommentModel.findByIdAndDelete(commentId);
  };

  async getCommentsCountByPostIds(postIds: string[]) {
    const result = await CommentModel.aggregate([
      {
        $match: {
          postId: { $in: postIds },
        },
      },
      {
        $group: {
          _id: "$postId",
          count: { $sum: 1 },
        },
      },
    ]);

    // convert → Map for O(1) lookup
    return new Map(result.map((item) => [item._id.toString(), item.count]));
  }
}
