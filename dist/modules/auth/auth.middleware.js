import { signinUserSchema, signupUserSchema } from "./auth.schema.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";
export const signupUserValidation = (req, _res, next) => {
    const result = signupUserSchema.safeParse(req.body);
    if (!result.success) {
        return next(new BadRequestError("Invalid signup payload", result.error.flatten()));
    }
    // sanitized + transformed data overwrite
    req.body = result.data;
    next();
};
export const signInUserValidation = (req, _res, next) => {
    const result = signinUserSchema.safeParse(req.body);
    if (!result.success) {
        return next(new BadRequestError("Invalid signin payload", result.error.flatten()));
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
//# sourceMappingURL=auth.middleware.js.map