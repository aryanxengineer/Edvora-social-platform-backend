import { Router } from "express";

// import { FeedRepository } from "./feed.repository.js";
// import { FeedController } from "./feed.controller.js";
// import { FeedService } from "./feed.service.js";

const feedRouter = Router();

// Dependency Injections for controller
// const feedRepository = new FeedRepository();
// const feedService = new FeedService(feedRepository);
// const feedController = new FeedController(feedService);

// feedRouter.get("/home", feedController.getHomeFeed);
// feedRouter.get("/following", feedController.getFollowingFeed);
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