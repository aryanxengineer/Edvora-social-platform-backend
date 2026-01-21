import { asyncHandler } from "@/common/utils/asyncHandler.js";
import type { PostService } from "./post.service.js";
import type { Request, Response } from "express";
import { sendResponse } from "@/common/utils/sendResponse.js";

export class PostController {
  constructor(private postService: PostService) {}

  public createPost = asyncHandler(async (req: Request, res: Response) => {
    // now we have sanitized and validated req.body here
    const post = await this.postService.createPost(req.body);

    return sendResponse({
      res,
      statusCode: 201,
      message: "Post created successfully",
      data: post,
    })
  });
}
