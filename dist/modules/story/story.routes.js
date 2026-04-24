import { Router } from "express";
// import { StoryController } from "./story.controller";
// import { StoryValidation } from "./story.validation";
// import { validateRequest } from "../../middlewares/validateRequest.middleware";
// import { AuthMiddleware } from "../../middlewares/auth.middleware";
const router = Router();
// Dependency Injection
// const storyController = new StoryController();
// const storyValidation = new StoryValidation();
// const authMiddleware = new AuthMiddleware();
// router.post(
//   "/stories",
//   authMiddleware.authenticate,
//   validateRequest(storyValidation.createStory),
//   storyController.createStory,
// );
// router.get(  
//   "/stories/feed",
//   authMiddleware.authenticate,
//   storyController.getStoryFeed,
// );
// router.get(
//   "/stories/:storyId",
//   authMiddleware.authenticate,
//   storyController.getStoryById,
// );
// router.delete(
//   "/stories/:storyId",
//   authMiddleware.authenticate,
//   storyController.deleteStory,
// );
// router.post(
//   "/stories/:storyId/view",
//   authMiddleware.authenticate,
//   storyController.recordStoryView,
// );
// router.get(
//   "/stories/highlights",
//   authMiddleware.authenticate,
//   storyController.getStoryHighlights,
// );
// router.post(
//   "/stories/highlights",
//   authMiddleware.authenticate,
//   validateRequest(storyValidation.createStoryHighlight),
//   storyController.createStoryHighlight,
// );
export const StoryRoutes = router;
/*

- `POST /stories`
- `GET /stories/feed`
- `GET /stories/:storyId`
- `DELETE /stories/:storyId`
- `POST /stories/:storyId/view`
- `GET /stories/highlights`
- `POST /stories/highlights`

*/
//# sourceMappingURL=story.routes.js.map