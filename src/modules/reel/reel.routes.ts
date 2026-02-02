import { Router } from "express";

// import { ReelRepository } from "./reel.repository.js";
// import { ReelController } from "./reel.controller.js";
// import { ReelService } from "./reel.service.js";


const reelRouter = Router();

// Dependency Injections for controller
// const reelRepository = new ReelRepository();
// const reelService = new ReelService(reelRepository);
// const reelController = new ReelController(reelService);


// reelRouter.post("/", reelController.createReel);
// reelRouter.get("/:reelId", reelController.getReelById);
// reelRouter.delete("/:reelId", reelController.deleteReel);
// reelRouter.get("/feed", reelController.getReelsFeed);
// reelRouter.get("/user/:userId", reelController.getReelsByUserId);
// reelRouter.post("/:reelId/view", reelController.viewReel);
// reelRouter.get("/trending", reelController.getTrendingReels);


export default reelRouter;


/*

- `POST /reels`
- `GET /reels/:reelId`
- `DELETE /reels/:reelId`
- `GET /reels/feed`
- `GET /users/:userId/reels`
- `POST /reels/:reelId/view`
- `GET /reels/trending`

*/