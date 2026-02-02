import { Router } from 'express';

// import { CommentRepository } from "./comment.repository.js";
// import { CommentController } from "./comment.controller.js";
// import { CommentService } from "./comment.service.js";

const commentRouter = Router();

// Dependency Injections for controller
// const commentRepository = new CommentRepository();
// const commentService = new CommentService(commentRepository);
// const commentController = new CommentController(commentService);

// commentRouter.post("/posts/:postId", commentController.addCommentToPost);
// commentRouter.post("/reels/:reelId", commentController.addCommentToReel);
// commentRouter.get("/:entityId", commentController.getCommentsByEntityId);
// commentRouter.delete("/:commentId", commentController.deleteComment);
// commentRouter.patch("/:commentId", commentController.updateComment);
// commentRouter.post("/:commentId/reply", commentController.replyToComment);
// commentRouter.post("/:commentId/like", commentController.likeComment);

export default commentRouter;


/*

- `POST /comments/posts/:postId`
- `POST /comments/reels/:reelId`
- `GET /comments/:entityId`
- `DELETE /comments/:commentId`
- `PATCH /comments/:commentId`
- `POST /comments/:commentId/reply`
- `POST /comments/:commentId/like`

*/