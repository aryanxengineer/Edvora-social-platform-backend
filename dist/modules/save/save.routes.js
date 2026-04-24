import { Router } from "express";
// import { SaveController } from "./save.controller";
// import { AuthMiddleware } from "../../middlewares/auth.middleware";
const router = Router();
// Dependency Injection
// const saveController = new SaveController();
// const authMiddleware = new AuthMiddleware();
// router.post(
//   "/saved/posts/:postId",
//   authMiddleware.authenticate,
//   saveController.savePost,
// );
// router.delete(
//   "/saved/posts/:postId",
//   authMiddleware.authenticate,
//   saveController.unsavePost,
// );
// router.get(
//   "/saved/posts",
//   authMiddleware.authenticate,
//   saveController.getSavedPosts,
// );
// router.post(
//   "/collections",
//   authMiddleware.authenticate,
//   saveController.createCollection,
// );
// router.post(
//   "/collections/:collectionId/posts/:postId",
//   authMiddleware.authenticate,
//   saveController.addPostToCollection,
// );
export const SaveRoutes = router;
/*

- `POST /saved/posts/:postId`
- `DELETE /saved/posts/:postId`
- `GET /saved/posts`
- `POST /collections`
- `POST /collections/:collectionId/posts/:postId`

*/ 
//# sourceMappingURL=save.routes.js.map