import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
export class FollowController {
    service;
    constructor(service) {
        this.service = service;
    }
    isFollowed = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        const { profileId } = req.params;
        if (!userId)
            throw new UnauthorizedError();
        if (!profileId)
            throw new UnauthorizedError();
        const result = await this.service.isFollowed(userId, profileId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Followed successfully",
            data: result
        });
    });
    follow = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        const { targetProfileId } = req.body;
        if (!userId)
            throw new UnauthorizedError();
        await this.service.follow(userId, targetProfileId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Followed successfully",
        });
    });
    unfollow = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        const { profileId } = req.params;
        if (!userId)
            throw new UnauthorizedError();
        if (!profileId)
            throw new BadRequestError();
        await this.service.unfollow(userId, profileId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Unfollowed successfully",
        });
    });
}
//# sourceMappingURL=follow.controller.js.map