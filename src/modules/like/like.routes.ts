import { Router } from "express";

import { LikeRepository } from "./like.repository.js";
import { LikeController } from "./like.controller.js";
import { LikeService } from "./like.service.js";
import { requireAuth } from "@middlewares/authorization.middleware.js";

const likeRouter = Router();

// Dependency Injections for controller
const likeRepository = new LikeRepository();
const likeService = new LikeService(likeRepository);
const likeController = new LikeController(likeService);

likeRouter.use(requireAuth);

likeRouter.put("/like/:postId", likeController.likePost);
likeRouter.put("/unlike/:postId", likeController.unlikePost);
// likeRouter.post("/reels/:reelId", likeController.likeReel);
// likeRouter.delete("/reels/:reelId", likeController.unlikeReel);

export default likeRouter;

/*

- `POST /likes/posts/:postId`
- `DELETE /likes/posts/:postId`
- `POST /likes/reels/:reelId`
- `DELETE /likes/reels/:reelId`
- `GET /likes/users/:userId`

*/
