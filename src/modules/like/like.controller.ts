import type { Request, Response } from "express";
import type { LikeService } from "./like.service.js";

import { asyncHandler } from "@common/utils/asyncHandler.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { sendResponse } from "@common/utils/sendResponse.js";

export class LikeController {
  constructor(private likeService: LikeService) {}

  // Like a post
  public likePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { postId } = req.params;

    if (typeof userId !== "string" || typeof postId !== "string") {
      throw new UnauthorizedError("Please login again for better experience");
    }

    await this.likeService.likePost(userId, postId);

    return sendResponse({
      res,
      statusCode: 201,
      message: "Post liked successfully",
    });
  });

  // Unlike a post
  public unlikePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { postId } = req.params;

    if (typeof userId !== "string" || typeof postId !== "string") {
      throw new UnauthorizedError("Please login again for better experience");
    }

    await this.likeService.unlikePost(userId, postId);

    return sendResponse({
      res,
      statusCode: 201,
      message: "Post unliked successfully",
    });
  });
}
