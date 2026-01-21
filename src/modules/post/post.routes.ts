import { Router } from 'express';
import { PostService } from './post.service.js';
import { PostController } from './post.controller.js';
import { PostRepository } from './post.repository.js';
import { validateNewPost } from './post.middleware.js';

const postRouter = Router();
const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

postRouter.post('/', validateNewPost, postController.createPost);

export default postRouter;