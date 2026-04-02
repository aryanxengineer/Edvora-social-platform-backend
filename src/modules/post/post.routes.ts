import { Router } from "express";
import { PostService } from "./post.service.js";
import { PostController } from "./post.controller.js";
import { PostRepository } from "./post.repository.js";
import { uploadImage } from "@config/multer.js";
import { requireAuth } from "@middlewares/authorization.middleware.js";

const postRouter = Router();
const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

postRouter.use(requireAuth);

postRouter.post("/new", uploadImage, postController.createPost);
postRouter.get("/:postId", postController.getPostById);
postRouter.delete("/:postId", postController.deletePost);
// postRouter.patch("/:postId", uploadImage, postController.updatePost);
// postRouter.get("/user/:userId", postController.getPostsByUserId);
// postRouter.get("/:postId/likes", postController.getPostLikes);
// postRouter.post("/:postId/archive", postController.archivePost);
// postRouter.post("/:postId/unarchive", postController.unarchivePost);

export default postRouter;
