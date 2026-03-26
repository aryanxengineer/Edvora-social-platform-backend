import { BadRequestError } from "@common/errors/badRequest.error.js";
import { PostModel } from "@modules/post/post.model.js";
import { ProfileModel } from "@modules/profile/profile.model.js";

export class LikeRepository {
  constructor() {}

  public likePost = async (userId: string, postId: string) => {
    const userProfile = await ProfileModel.findOne({
      userId,
    }).select("_id username avatar");

    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { likesCount: 1 },
      },
      { new: true },
    );

    return;
  };

  public unlikePost = async (userId: string, postId: string) => {
    const userProfile = await ProfileModel.findOne({
      userId,
    }).select("_id username avatar");

    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
        likesCount: { $gt: 0 },
      },
      {
        $inc: { likesCount: -1 },
      },
      { new: true },
    );

    if (!post) {
      throw new BadRequestError(
        "You cannot unlike this post, Firstly you have to like the post",
      );
    }

    return;
  };
}
