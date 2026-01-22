import { Router } from "express";
import { PostService } from "./post.service.js";
import { PostController } from "./post.controller.js";
import { PostRepository } from "./post.repository.js";
import { validateNewPost } from "./post.middleware.js";
import { uploadImage } from "@/config/multer.js";

const postRouter = Router();
const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

postRouter.post(
  "/",
  uploadImage,
//   validateNewPost,
  postController.createPost,
);

export default postRouter;
