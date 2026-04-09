import type { Request, Response } from "express";
import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import type { FollowService } from "./follow.service.js";

export class FollowController {
  constructor(private service: FollowService) {}

  follow = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { targetUserId } = req.body;

    if (!userId) throw new UnauthorizedError();

    await this.service.follow(userId, targetUserId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "Followed successfully",
    });
  });

  unfollow = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { targetUserId } = req.body;

    if (!userId) throw new UnauthorizedError();

    await this.service.unfollow(userId, targetUserId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "Unfollowed successfully",
    });
  });
}