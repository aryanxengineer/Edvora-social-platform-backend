import type { NextFunction, Request, Response } from "express";
import { createdPostSchema } from "./post.schema.js";
import { BadRequestError } from "@/common/errors/badRequest.error.js";

export const validateCreatePost = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const result = createdPostSchema.safeParse(req.body);

  if (!result.success) {
    return next(
      new BadRequestError("Invalid signup payload", result.error.flatten())
    );
  }

  // sanitized + transformed data overwrite
  req.body = result.data;

  next();
};
