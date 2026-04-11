import { NotFoundError } from "@common/errors/notFound.error.js";
import { PostRepository } from "@modules/post/post.repository.js";
import { FollowRepository } from "@modules/follow/follow.repository.js";

export class FeedService {
  constructor(
    private postRepository: PostRepository,
    private followRepository: FollowRepository,
  ) {}

  public trending = async (userId: string) => {
    const trendingPosts = this.postRepository.find(userId);

    if (!trendingPosts) {
      throw new NotFoundError("Trending posts not found");
    }

    return trendingPosts;
  };

  public followingPosts = async (userId: string) => {
    const following = await this.followRepository.find(userId);

    const followingIds = following.map((f) => f.followingId);

    if (followingIds.length === 0) return [];

    if (!followingIds) {
      throw new NotFoundError("Following users not found");
    }

    const followingPosts =
      await this.postRepository.findByProfileId(followingIds as unknown as string[]);

    return followingPosts;
  };
}
