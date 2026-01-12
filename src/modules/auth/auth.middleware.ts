// auth.validation.ts
import type { Request, Response, NextFunction } from "express";
import { signInSchema, signupSchema } from "./auth.schema.js";
import { BadRequestError } from "@/common/errors/badRequest.error.js";

export const signupUserValidation = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  

  const result = signupSchema.safeParse(req.body);
  
  if (!result.success) {
    return next(
      new BadRequestError("Invalid signup payload", result.error.flatten())
    );
  }
  
  // sanitized + transformed data overwrite
  req.body = result.data;
  
  next();
};


export const signInUserValidation = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  

  const result = signInSchema.safeParse(req.body);
  
  if (!result.success) {
    return next(
      new BadRequestError("Invalid signup payload", result.error.flatten())
    );
  }
  
  // sanitized + transformed data overwrite
  req.body = result.data;
  
  next();
};