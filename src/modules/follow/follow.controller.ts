import type { Request, Response } from "express";
import type { FollowService } from "./follow.service.js";

import { asyncHandler } from "@common/utils/asyncHandler.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { sendResponse } from "@common/utils/sendResponse.js";

export class FollowController {
  constructor(private followService: FollowService) {}

  // follow user functionality
  public followProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const otherProfileId = req.params;

    if (
      typeof userId !== "string" ||
      typeof otherProfileId.profileId !== "string"
    ) {
      throw new UnauthorizedError("Please login again for better experience");
    }

    await this.followService.followProfile(userId, otherProfileId.profileId);

    return sendResponse({
      res,
      statusCode: 201,
      message: "Follow a profile successfully",
    });
  });

  // follow user functionality
  public unfollowProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const otherProfileId = req.params;

    if (
      typeof userId !== "string" ||
      typeof otherProfileId.profileId !== "string"
    ) {
      throw new UnauthorizedError("Please login again for better experience");
    }

    await this.followService.unfollowProfile(userId, otherProfileId.profileId);

    return sendResponse({
      res,
      statusCode: 201,
      message: "Unfollow a profile successfully",
    });
  });

  // follow user functionality
  public followBackProfile = asyncHandler(
    async (req: Request, res: Response) => {},
  );

  // follow user functionality
  public profileFollowers = asyncHandler(
    async (req: Request, res: Response) => {
      const profile = req.params;

      if (typeof profile.profileId !== "string") {
        throw new UnauthorizedError("Please login again for better experience");
      }

      const followersData = await this.followService.profileFollowers(
        profile.profileId,
      );

      return sendResponse({
        res,
        statusCode: 200,
        message: "Fetched follower data successfully",
        data: followersData
      });
    },
  );

  // follow user functionality
  public profileFollowings = asyncHandler(
    async (req: Request, res: Response) => {},
  );
}
