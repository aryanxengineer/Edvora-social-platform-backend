// src/app/error.middleware.ts

import type { Request, Response, NextFunction } from "express";
import { AppError } from "@common/errors/base.error.js";

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      details: err.details,
    });
  }

  // fallback (never expose internal error)
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    code: "UNEXPECTED_ERROR",
  });
};
