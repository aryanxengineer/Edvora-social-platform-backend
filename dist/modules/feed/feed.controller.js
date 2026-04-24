import { asyncHandler } from "@common/utils/asyncHandler.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { sendResponse } from "@common/utils/sendResponse.js";
export class FeedController {
    feedService;
    constructor(feedService) {
        this.feedService = feedService;
    }
    trending = asyncHandler(async (req, res, next) => {
        const userId = req.session.user?.userId;
        if (!userId) {
            throw new UnauthorizedError();
        }
        const trendingFeed = await this.feedService.trending(userId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Successfully fetch trending feed",
            data: trendingFeed,
        });
    });
    followingFeed = asyncHandler(async (req, res, next) => {
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
    });
}
//# sourceMappingURL=feed.controller.js.map