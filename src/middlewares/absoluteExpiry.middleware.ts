import type { Request, Response, NextFunction } from "express";

const MAX_SESSION_AGE = 90 * 24 * 60 * 60 * 1000; // 90 days

export const absoluteExpirySessionAt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) {
    return next(); // safety guard
  }

  // Initialize if not present
  if (!req.session.createdAt) {
    req.session.createdAt = Date.now();
    return next();
  }

  const isExpired =
    Date.now() - req.session.createdAt > MAX_SESSION_AGE;

  if (isExpired) {
    return req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      res.clearCookie("connect.sid"); // important
      return res.status(401).json({
        message: "Session expired. Please login again.",
      });
    });
  }

  return next();
};