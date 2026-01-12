import type { Request, Response } from "express";

import { AuthApplicationService } from "./auth.application.js";

import { asyncHandler } from "@/common/utils/asyncHandler.js";
import { sendResponse } from "@/common/utils/sendResponse.js";
import { cookieOptions } from "@/common/http/cookieOptions.js";
import { appCache } from "@/common/cache/index.js";

export class AuthController {
  constructor(private readonly authAppService: AuthApplicationService) {}

  // Sign up controller
  public signUp = asyncHandler(async (req: Request, res: Response) => {
    // send data to the service
    const { user, accessToken, refreshToken } =
      await this.authAppService.signUp(req.body);

    res.cookie("accessToken", accessToken, cookieOptions.access);
    res.cookie("refreshToken", refreshToken, cookieOptions.refresh);

    appCache.set("refreshToken", refreshToken, {
      ttl: 30 * 24 * 60 * 60 * 1000,
    });

    return sendResponse({
      res,
      statusCode: 201,
      message: "User registered successfully",
      data: user,
    });
  });

  // Sign in controller
  signIn = asyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } =
      await this.authAppService.signIn(req.body);
    res.cookie("accessToken", accessToken, cookieOptions.access);
    res.cookie("refreshToken", refreshToken, cookieOptions.refresh);

    appCache.set("refreshToken", refreshToken, {
      ttl: 30 * 24 * 60 * 60 * 1000,
    });

    return sendResponse({
      res,
      statusCode: 200,
      message: "User login successfully",
      data: user,
    });
  });

  // Sign out controller
  signOut = asyncHandler(async (req: Request, res: Response) => {
    console.log("user aa gya", req.body);
    res.clearCookie("accessToken", cookieOptions.access);
    res.clearCookie("refreshToken", cookieOptions.refresh);
    appCache.delete("refreshToken");

    return sendResponse({
      res,
      statusCode: 200,
      message: "User logged out successfully",
    });
  });
}
