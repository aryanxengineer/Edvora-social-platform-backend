import { Router } from "express";
import { PostService } from "./post.service.js";
import { PostController } from "./post.controller.js";
import { PostRepository } from "./post.repository.js";
import { uploadImage } from "@config/multer.js";
import { requireAuth } from "@middlewares/authorization.middleware.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { LikeRepository } from "@modules/like/like.repository.js";
import { CommentRepository } from "@modules/comment/comment.repository.js";

const postRouter = Router();
const likeRepo = new LikeRepository()
const commentRepo = new CommentRepository()
const postRepository = new PostRepository();
const profileRepository = new ProfileRepository();
const postService = new PostService(likeRepo, commentRepo, postRepository, profileRepository);
const postController = new PostController(postService);

postRouter.use(requireAuth);

postRouter.post("/", uploadImage, postController.createPost);
postRouter.get("/post/:postId", postController.getPostById);
postRouter.get("/:profileId", postController.getProfilePosts);
postRouter.delete("/:postId", postController.deletePost);
// postRouter.patch("/:postId", uploadImage, postController.updatePost);
// postRouter.get("/user/:userId", postController.getPostsByUserId);
// postRouter.get("/:postId/likes", postController.getPostLikes);
// postRouter.post("/:postId/archive", postController.archivePost);
// postRouter.post("/:postId/unarchive", postController.unarchivePost);

export default postRouter;
