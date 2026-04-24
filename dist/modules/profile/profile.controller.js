import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";
export class ProfileController {
    service;
    constructor(service) {
        this.service = service;
    }
    myProfile = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        if (!userId) {
            throw new UnauthorizedError("Unauthorized");
        }
        const profile = await this.service.getMyProfile(userId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Profile fetched",
            data: profile,
        });
    });
    otherProfile = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        const { profileId } = req.params;
        if (!userId) {
            throw new UnauthorizedError("Unauthorized");
        }
        if (!profileId) {
            throw new BadRequestError("Bad request profile id");
        }
        const profile = await this.service.getOtherProfile(profileId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Profile fetched",
            data: profile,
        });
    });
    newAvatar = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        const file = req.file;
        if (!userId) {
            throw new UnauthorizedError("Unauthorized");
        }
        if (!file) {
            throw new BadRequestError("Invalid file");
        }
        const result = await this.service.newAvatar();
        return sendResponse({
            res,
            statusCode: 201,
            message: "Added new avatar",
            data: result.url,
        });
    });
}
//# sourceMappingURL=profile.controller.js.map