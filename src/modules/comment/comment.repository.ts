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
    return await CommentModel.findByIdAndDelete(commentId)
  };
}
