import { Router } from "express";

import { CommentRepository } from "./comment.repository.js";
import { CommentController } from "./comment.controller.js";
import { CommentService } from "./comment.service.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { PostRepository } from "@modules/post/post.repository.js";

const commentRouter = Router();

// Dependency Injections for controller
const commentRepository = new CommentRepository();
const profileRepository = new ProfileRepository();
const postRepository = new PostRepository();
const commentService = new CommentService(
  commentRepository,
  profileRepository,
  postRepository,
);
const commentController = new CommentController(commentService);

commentRouter.get("/:postId", commentController.comments);
commentRouter.post("/", commentController.postComment);
commentRouter.delete("/:commentId", commentController.deleteComment);
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
