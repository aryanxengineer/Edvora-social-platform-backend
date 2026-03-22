import { Router } from "express";

import { FollowRepository } from "./follow.repository.js";
import { FollowController } from "./follow.controller.js";
import { FollowService } from "./follow.service.js";
import { requireAuth } from "@middlewares/authorization.middleware.js";

const followRouter = Router();

// Dependency Injections for controller
const followRepository = new FollowRepository();
const followService = new FollowService(followRepository);
const followController = new FollowController(followService);

followRouter.post("/", requireAuth, followController.followUser);
// followRouter.delete("/:userId", followController.unfollowUser);
// followRouter.get("/followers/:userId", followController.getFollowers);
// followRouter.get("/following/:userId", followController.getFollowing);
// followRouter.get("/requests", followController.getFollowRequests);
// followRouter.post("/requests/:userId/accept", followController.acceptFollowRequest);
// followRouter.delete("/requests/:userId/reject", followController.rejectFollowRequest);
// followRouter.get("/suggestions", followController.getFollowSuggestions);


export default followRouter;

/*

- `POST /follow/:userId`
- `DELETE /unfollow/:userId`
- `GET /followers/:userId`
- `GET /following/:userId`
- `GET /follow/requests`
- `POST /follow/requests/:userId/accept`
- `DELETE /follow/requests/:userId/reject`
- `GET /follow/suggestions`

*/