import type { Request, Response } from "express";

// Import Auth Service Type
import type { AuthService } from "./auth.service.js";

// Import Utility Functions
import { asyncHandler } from "@/common/utils/asyncHandler.js";
import { sendResponse } from "@/common/utils/sendResponse.js";
import { cookieOptions } from "@/common/http/cookieOptions.js";

// Auth Controller Class
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Sign up controller
  public signUp = asyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await this.authService.signUp(
      req.body,
    );

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
    const { user, accessToken, refreshToken } = await this.authService.signIn(
      req.body,
    );

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
    res.clearCookie("accessToken", cookieOptions.access);
    res.clearCookie("refreshToken", cookieOptions.refresh);

    return sendResponse({
      res,
      statusCode: 200,
      message: "User logged out successfully",
    });
  });
}
