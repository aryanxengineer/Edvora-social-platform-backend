import type { Request, Response } from "express";
import type { PostService } from "./post.service.js";

import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";

export class PostController {
  constructor(private postService: PostService) {}

  public createPost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;

    if (typeof userId !== "string") {
      throw new UnauthorizedError("Please login again for better experience");
    }

    // now we have sanitized and validated req.body here
    if (!req.file) {
      return sendResponse({
        res,
        statusCode: 400,
        message: "Image is required",
      });
    }

    await this.postService.createPost(userId, req.body, req.file);

    return sendResponse({
      res,
      statusCode: 201,
      message: "Post created successfully",
    });
  });

  public getPostById = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
      throw new BadRequestError("Post id must be provided in the url");
    }

    const post = await this.postService.getPostById(postId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "Successfully got the single post",
      data: post,
    });
  });

  public getProfilePosts = asyncHandler(async (req: Request, res: Response) => {
    const { profileId } = req.params;

    if (!profileId) {
      throw new BadRequestError("Post id must be provided in the url");
    }

    const posts = await this.postService.getProfilePosts(profileId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "Successfully got the single post",
      data: posts,
    });
  });

  public deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
      throw new BadRequestError("Post id must be provided in the url");
    }

    const post = await this.postService.deletePost(postId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "Successfully deleted the single post",
    });
  });
}
