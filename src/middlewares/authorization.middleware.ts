import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import type { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.user) {
    throw new UnauthorizedError();
  }

  req.user = {
    userId: req.session.user.userId,
  };

  next();
};
