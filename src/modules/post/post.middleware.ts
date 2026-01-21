import type { NextFunction, Request, Response } from "express";
import { newPostSchema } from "./post.schema.js";
import { BadRequestError } from "@/common/errors/badRequest.error.js";

export const validateNewPost = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const result = newPostSchema.safeParse(req.body);

  if (!result.success) {
    return next(
      new BadRequestError("Invalid signup payload", result.error.flatten())
    );
  }

  // sanitized + transformed data overwrite
  req.body = result.data;

  next();
};
