import { asyncHandler } from "@common/utils/asyncHandler.js";
import { FeedService } from "./feed.service.js";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { sendResponse } from "@common/utils/sendResponse.js";

export class FeedController {
  constructor(private feedService: FeedService) {}

  public trending = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.session.user?.userId;
      if (!userId) {
        throw new UnauthorizedError();
      }
      const trendingFeed = this.feedService.trending(userId);

      return sendResponse({
        res,
        statusCode: 200,
        message: "Successfully fetch trending feed",
        data: trendingFeed,
      });
    },
  );


  public followingFeed = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.session.user?.userId;
      if (!userId) {
        throw new UnauthorizedError();
      }
      const followingUsersFeed = this.feedService.followingPosts(userId);

      return sendResponse({
        res,
        statusCode: 200,
        message: "Successfully fetch trending feed",
        data: followingUsersFeed,
      });
    },
  );
}
