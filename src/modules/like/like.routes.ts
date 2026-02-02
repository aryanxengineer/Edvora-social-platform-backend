import { Router } from "express";

// import { LikeRepository } from "./like.repository.js";
// import { LikeController } from "./like.controller.js";
// import { LikeService } from "./like.service.js";

const likeRouter = Router();

// Dependency Injections for controller
// const likeRepository = new LikeRepository();
// const likeService = new LikeService(likeRepository);
// const likeController = new LikeController(likeService);


// likeRouter.post("/posts/:postId", likeController.likePost);
// likeRouter.delete("/posts/:postId", likeController.unlikePost);
// likeRouter.post("/reels/:reelId", likeController.likeReel);
// likeRouter.delete("/reels/:reelId", likeController.unlikeReel);
// likeRouter.get("/users/:userId", likeController.getUserLikes);


export default likeRouter;

/*

- `POST /likes/posts/:postId`
- `DELETE /likes/posts/:postId`
- `POST /likes/reels/:reelId`
- `DELETE /likes/reels/:reelId`
- `GET /likes/users/:userId`

*/