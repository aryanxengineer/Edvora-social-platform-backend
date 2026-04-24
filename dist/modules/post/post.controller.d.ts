import type { Request, Response } from "express";
import type { PostService } from "./post.service.js";
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    createPost: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getPostById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getProfilePosts: (req: Request, res: Response, next: import("express").NextFunction) => void;
    deletePost: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=post.controller.d.ts.map