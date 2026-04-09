// import { Router } from "express";

// import { LikeRepository } from "./like.repository.js";
// import { LikeController } from "./like.controller.js";
// import { LikeService } from "./like.service.js";
// import { requireAuth } from "@middlewares/authorization.middleware.js";

// const likeRouter = Router();

// // Dependency Injections for controller
// const likeRepository = new LikeRepository();
// const likeService = new LikeService(likeRepository);
// const likeController = new LikeController(likeService);

// likeRouter.use(requireAuth);

// likeRouter.put("/like/:postId", likeController.likePost);
// likeRouter.put("/unlike/:postId", likeController.unlikePost);
// // likeRouter.post("/reels/:reelId", likeController.likeReel);
// // likeRouter.delete("/reels/:reelId", likeController.unlikeReel);

// export default likeRouter;

// /*

// - `POST /likes/posts/:postId`
// - `DELETE /likes/posts/:postId`
// - `POST /likes/reels/:reelId`
// - `DELETE /likes/reels/:reelId`
// - `GET /likes/users/:userId`

// */

import { Router } from "express";
import { LikeController } from "./like.controller.js";
import { LikeService } from "./like.service.js";
import { LikeRepository } from "./like.repository.js";
import { PostRepository } from "@modules/post/post.repository.js";
import { requireAuth } from "@middlewares/authorization.middleware.js";

const likeRouter = Router();

const likeRepo = new LikeRepository();
const postRepo = new PostRepository();

const service = new LikeService(likeRepo, postRepo);
const controller = new LikeController(service);

likeRouter.use(requireAuth);

likeRouter.post("/:postId", controller.likePost);
likeRouter.delete("/:postId", controller.unlikePost);

export default likeRouter;
