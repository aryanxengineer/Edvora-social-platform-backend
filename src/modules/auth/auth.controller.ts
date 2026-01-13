import type { Request, Response } from "express";

import { AuthApplicationService } from "./auth.application.js";

import { asyncHandler } from "@/common/utils/asyncHandler.js";
import { sendResponse } from "@/common/utils/sendResponse.js";
import { cookieOptions } from "@/common/http/cookieOptions.js";
import type { TokenService } from "@/common/auth/token.service.js";

export class AuthController {
  constructor(
    private readonly authAppService: AuthApplicationService,
    private readonly tokenService: TokenService
  ) {}

  // Sign up controller
  public signUp = asyncHandler(async (req: Request, res: Response) => {
    const device = req.headers["user-agent"] || "Unknown Device";
    const { user, accessToken, refreshToken } =
      await this.authAppService.signUp(req.body, device);

    res.cookie("accessToken", accessToken, cookieOptions.access);
    res.cookie("refreshToken", refreshToken, cookieOptions.refresh);

    return sendResponse({
      res,
      statusCode: 201,
      message: "User registered successfully",
      data: user,
    });
  });

  // Sign in controller
  public signIn = asyncHandler(async (req: Request, res: Response) => {
    const device = req.headers["user-agent"] || "Unknown Device";
    console.log("Device Info:", device);
    const { user, accessToken, refreshToken } =
      await this.authAppService.signIn(req.body, device);

    res.cookie("accessToken", accessToken, cookieOptions.access);
    res.cookie("refreshToken", refreshToken, cookieOptions.refresh);

    return sendResponse({
      res,
      statusCode: 200,
      message: "User login successfully",
      data: user,
    });
  });

  // Sign out controller
  public signOut = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const session = await this.tokenService.verifyRefreshToken(refreshToken);
      if (session?.sessionId) {
        await this.authAppService.signOut(session.sessionId);
      }
    }

    res.clearCookie("accessToken", cookieOptions.access);
    res.clearCookie("refreshToken", cookieOptions.refresh);

    return sendResponse({
      res,
      statusCode: 200,
      message: "User logged out successfully",
    });
  });
}
