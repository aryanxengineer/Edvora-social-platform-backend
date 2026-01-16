import { asyncHandler } from "@/common/utils/asyncHandler.js";
import type { PostService } from "./post.service.js";
import type { Request, Response } from "express";

export class PostController {
    constructor(private postService: PostService) {}

    public createPost = asyncHandler(async (req: Request, res: Response) => {
        // now we have sanitized and validated req.body here
        const post = await this.postService.createPost(req.body);

        res.send('post created');
    })
}