import type { Request, Response } from "express";
import type { LikeService } from "./like.service.js";

import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";

export class LikeController {
  constructor(private service: LikeService) {}

  likes = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { postId } = req.params;

    if (!userId) {
      throw new UnauthorizedError();
    }
    if (!postId) {
      throw new BadRequestError();
    }

    const postLikes = await this.service.likes(userId, postId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "fetched post likes",
      data: postLikes
    });
  });
  
  likePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { postId } = req.params;

    if (!userId) {
      throw new UnauthorizedError();
    }
    if (!postId) {
      throw new BadRequestError();
    }

    await this.service.likePost(userId, postId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "Post liked",
    });
  });

  unlikePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { postId } = req.params;

    if (!userId) {
      throw new UnauthorizedError();
    }

    if (!postId) {
      throw new BadRequestError();
    }

    await this.service.unlikePost(userId, postId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "Post unliked",
    });
  });
}
