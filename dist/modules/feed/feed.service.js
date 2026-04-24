import { NotFoundError } from "@common/errors/notFound.error.js";
export class FeedService {
    postRepository;
    followRepository;
    profileRepository;
    likeRepository;
    commentRepository;
    constructor(postRepository, followRepository, profileRepository, likeRepository, commentRepository) {
        this.postRepository = postRepository;
        this.followRepository = followRepository;
        this.profileRepository = profileRepository;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
    }
    trending = async (userId) => {
        const profile = await this.profileRepository.findByUserId(userId);
        if (!profile) {
            throw new NotFoundError("Your profile is not found");
        }
        const trendingPosts = await this.postRepository.find(profile._id);
        if (!trendingPosts || trendingPosts.length === 0) {
            throw new NotFoundError("Trending posts not found");
        }
        const postIds = trendingPosts.map((post) => post._id.toString());
        // ✅ Likes
        const likedPosts = await this.likeRepository.findByUserAndPostIds(userId, postIds);
        const likedSet = new Set(likedPosts.map((like) => like.postId.toString()));
        // ✅ Comments (via repository)
        const commentsCountMap = await this.commentRepository.getCommentsCountByPostIds(postIds);
        // ✅ Final response
        const result = trendingPosts.map((post) => ({
            ...post,
            isLiked: likedSet.has(post._id.toString()),
            commentsCount: commentsCountMap.get(post._id.toString()) || 0,
        }));
        return result;
    };
    followingPosts = async (userId) => {
        const following = await this.followRepository.find(userId);
        const followingIds = following.map((f) => f.followingId);
        if (followingIds.length === 0)
            return [];
        if (!followingIds) {
            throw new NotFoundError("Following users not found");
        }
        const followingPosts = await this.postRepository.findByProfileId(followingIds);
        return followingPosts;
    };
}
//# sourceMappingURL=feed.service.js.map