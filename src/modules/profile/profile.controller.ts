import type { Request, Response } from "express";
import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import type { ProfileService } from "./profile.service.js";

export class ProfileController {
  constructor(private service: ProfileService) {}

  myProfile = asyncHandler(async (req: Request, res: Response) => {
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
}