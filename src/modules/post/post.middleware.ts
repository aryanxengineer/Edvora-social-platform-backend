import type { NextFunction, Request, Response } from "express";
import { newPostSchema } from "./post.schema.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";

export const validateNewPost = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {

  const formattedPostData = {
    imageUrl: req.file,
    title: req.body?.title,
    caption: req.body?.caption,
    location: req.body?.location,
    tags: req.body?.tags,
    mentions: req.body?.mentions,
  }
  const result = newPostSchema.safeParse(formattedPostData);

  if (!result.success) {
    return next(
      new BadRequestError("Invalid new posts payload", result.error.flatten()),
    );
  }

  // sanitized + transformed data overwrite
  req.body = result.data;

  next();
};
