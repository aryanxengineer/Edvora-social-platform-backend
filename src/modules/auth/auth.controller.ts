import { asyncHandler } from "@common/utils/asyncHandler.js";
import { AuthService } from "./auth.service.js";
import { Request, Response } from "express";
import { sendResponse } from "@common/utils/sendResponse.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";

export class AuthController {
  constructor(private readonly service: AuthService) {}

  signUp = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.service.register(req.body);

    req.session.user = {
      userId: user.id,
    };

    return sendResponse({
      res,
      statusCode: 201,
      message: "User registered",
      data: user,
    });
  });

  signIn = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.service.login(req.body);

    await new Promise<void>((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) return reject(new UnauthorizedError("Session error"));

        req.session.user = {
          userId: user.id,
        };

        req.session.save((err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    });

    return sendResponse({
      res,
      statusCode: 200,
      message: "Login successful",
      data: user,
    });
  });

  me = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const user = await this.service.getUser(userId);

    return sendResponse({
      res,
      statusCode: 200,
      message: "User fetched",
      data: user,
    });
  });

  signOut = asyncHandler(async (req: Request, res: Response) => {
    req.session.destroy(() => {});

    res.clearCookie("connect.sid");

    return sendResponse({
      res,
      statusCode: 200,
      message: "Logged out",
    });
  });
}
