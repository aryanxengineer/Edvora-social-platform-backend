import { type ISignInUser, type ISignUpUser } from "./auth.types.js";
// auth.validation.ts
import type { Request, Response, NextFunction } from "express";
import { signinUserSchema, signupUserSchema } from "./auth.schema.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";

export const signupUserValidation = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const result = signupUserSchema.safeParse(req.body as ISignUpUser);

  if (!result.success) {
    return next(
      new BadRequestError("Invalid signup payload", result.error.flatten()),
    );
  }

  // sanitized + transformed data overwrite
  req.body = result.data;

  next();
};

export const signInUserValidation = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const result = signinUserSchema.safeParse(req.body as ISignInUser);

  if (!result.success) {
    return next(
      new BadRequestError("Invalid signin payload", result.error.flatten()),
    );
  }

  // sanitized + transformed data overwrite
  req.body = result.data;

  next();
};



// export const isProfilePictureGiven = (
//   req: Request,
//   _res: Response,
//   next: NextFunction,
// ) => {
//   const result = signinUserSchema.safeParse(req.body as ISignInUser);

//   if (!result.success) {
//     return next(
//       new BadRequestError("Invalid signin payload", result.error.flatten()),
//     );
//   }

//   // sanitized + transformed data overwrite
//   req.body = result.data;

//   next();
// };