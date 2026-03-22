import type { Request, Response } from "express";

import { asyncHandler } from "@common/utils/asyncHandler.js";
import type { ProfileService } from "./profile.service.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // fetching user profile
  public myProfile = asyncHandler(async (req: Request, res: Response) => {

    console.log('req mere controller tak aa gyi hai');

    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedError(
        "Unauthorize user login again for new userId",
      );
    }

    const profileData = await this.profileService.myProfile(userId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "UserProfile fetched successfully",
      data: profileData,
    });
  });
}
