import type { Request, Response } from "express";

// Import Auth Service Type
import type { AuthService } from "./auth.service.js";

// Import Utility Functions
import { asyncHandler } from "@/common/utils/asyncHandler.js";
import { sendResponse } from "@/common/utils/sendResponse.js";
import { redis } from "@/config/redis.js";
import { UnauthorizedError } from "@/common/errors/unauthorized.error.js";

// Auth Controller Class
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Sign up controller
  public signUp = asyncHandler(async (req: Request, res: Response) => {
    const { user } = await this.authService.signUp(req.body);

    req.session.user = {
      userId: user.id,
      ...(user.email && { email: user.email }),
      device: req.headers["user-agent"] || "",
      ip: req.ip || "",
    };

    // Track session for multi-device mapping
    const sessionId = req.sessionID;
    await redis.sAdd(`user:${user.id}:sessions`, sessionId);

    return sendResponse({
      res,
      statusCode: 201,
      message: "User registered successfully",
      data: user,
    });
  });

  // Sign in controller
  public signIn = asyncHandler(async (req: Request, res: Response) => {
    const { user } = await this.authService.signIn(req.body);

    req.session.user = {
      userId: user.id,
      ...(user.email && { email: user.email }),
      ...(req.headers["user-agent"] && { device: req.headers["user-agent"] }),
      ...(req.ip && { ip: req.ip }),
    };

    // Track session for multi-device mapping
    const sessionId = req.sessionID;
    await redis.sAdd(`user:${user.id}:sessions`, sessionId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "User login successfully",
      data: user,
    });
  });

  // Sign out controller
  public signOutSingleDevice = asyncHandler(
    async (req: Request, res: Response) => {
      const userId = req.session.user?.userId;
      const sessionId = req.sessionID;

      if (userId) {
        // Remove this session from user's session set
        await redis.sRem(`user:${userId}:sessions`, sessionId);
      }

      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Logout failed" });
        }

        res.clearCookie("sessionId");
        res.clearCookie("refreshToken");

        return sendResponse({
          res,
          statusCode: 200,
          message: "Logged out from current device",
        });
      });
    },
  );

  // Sign out from all devices controller
  public signOutAllDevices = asyncHandler(
    async (req: Request, res: Response) => {
      const userId = req.session.user?.userId;

      if (!userId) {
        throw new UnauthorizedError();
      }

      // Get all active sessions for this user
      const sessionIds = await redis.sMembers(`user:${userId}:sessions`);

      if (sessionIds.length > 0) {
        // Delete each session from Redis
        const keysToDelete = sessionIds.map((id) => `sess:${id}`);
        await redis.del(keysToDelete);

        // Delete user's session set
        await redis.del(`user:${userId}:sessions`);
      }

      // Destroy current session
      req.session.destroy(() => {});
      res.clearCookie("connect.sid");

      return sendResponse({
        res,
        statusCode: 200,
        message: "Logged out from all devices",
      });
    },
  );
}
