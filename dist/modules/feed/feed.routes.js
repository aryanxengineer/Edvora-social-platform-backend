import { Router } from "express";
import { FeedController } from "./feed.controller.js";
import { FeedService } from "./feed.service.js";
import { requireAuth } from "@middlewares/authorization.middleware.js";
import { PostRepository } from "@modules/post/post.repository.js";
import { FollowRepository } from "@modules/follow/follow.repository.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { LikeRepository } from "@modules/like/like.repository.js";
import { CommentRepository } from "@modules/comment/comment.repository.js";
const feedRouter = Router();
// Dependency Injections for controller
const likeRepository = new LikeRepository();
const postRepository = new PostRepository();
const followRepository = new FollowRepository();
const profileRepository = new ProfileRepository();
const commentRepository = new CommentRepository();
const feedService = new FeedService(postRepository, followRepository, profileRepository, likeRepository, commentRepository);
const feedController = new FeedController(feedService);
feedRouter.use(requireAuth);
feedRouter.get("/trending", feedController.trending);
feedRouter.get("/following", feedController.followingFeed);
// feedRouter.get("/explore", feedController.getExploreFeed);
// feedRouter.get("/reels", feedController.getReelsFeed);
// feedRouter.post("/refresh", feedController.refreshFeed);
export default feedRouter;
/*

- `GET /feed/home`
- `GET /feed/following`
- `GET /feed/explore`
- `GET /feed/reels`
- `POST /feed/refresh`

*/
//# sourceMappingURL=feed.routes.js.map