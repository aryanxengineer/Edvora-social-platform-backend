import { NotFoundError } from "@common/errors/notFound.error.js";
import { PostRepository } from "@modules/post/post.repository.js";
import { FollowRepository } from "@modules/follow/follow.repository.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { IPost } from "@modules/post/post.types.js";
import CommentModel from "@modules/comment/comment.model.js";
import { LikeRepository } from "@modules/like/like.repository.js";
import { CommentRepository } from "@modules/comment/comment.repository.js";

export class FeedService {
  constructor(
    private postRepository: PostRepository,
    private followRepository: FollowRepository,
    private profileRepository: ProfileRepository,
    private likeRepository: LikeRepository,
    private commentRepository: CommentRepository
  ) {}

  public trending = async (userId: string) => {
    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Your profile is not found");
    }

    const trendingPosts = await this.postRepository.find(profile._id);

    if (!trendingPosts || trendingPosts.length === 0) {
      throw new NotFoundError("Trending posts not found");
    }

    const postIds = trendingPosts.map((post: IPost) => post._id.toString());

    // ✅ Likes
    const likedPosts = await this.likeRepository.findByUserAndPostIds(
      userId,
      postIds,
    );

    const likedSet = new Set(likedPosts.map((like) => like.postId.toString()));

    // ✅ Comments (via repository)
  const commentsCountMap =
    await this.commentRepository.getCommentsCountByPostIds(postIds);

    // ✅ Final response
    const result = trendingPosts.map((post: IPost) => ({
      ...post,
      isLiked: likedSet.has(post._id.toString()),
      commentsCount: commentsCountMap.get(post._id.toString()) || 0,
    }));

    return result;
  };

  public followingPosts = async (userId: string) => {
    const following = await this.followRepository.find(userId);

    const followingIds = following.map((f) => f.followingId);

    if (followingIds.length === 0) return [];

    if (!followingIds) {
      throw new NotFoundError("Following users not found");
    }

    const followingPosts = await this.postRepository.findByProfileId(
      followingIds as unknown as string[],
    );

    return followingPosts;
  };
}
