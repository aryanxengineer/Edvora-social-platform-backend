import { Router } from "express";

import { AuthRepository } from "./auth.repository.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

import {
  signInUserValidation,
  signupUserValidation,
} from "./auth.middleware.js";

const authRouter = Router();

// Dependency Injections for controller
const authRepository = new AuthRepository();

const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post("/signup", signupUserValidation, authController.signUp);
authRouter.post("/signin", signInUserValidation, authController.signIn);
authRouter.post("/signout-single-device", authController.signOutSingleDevice);
authRouter.post("/signout-all-devices", authController.signOutAllDevices);
authRouter.post("/verify-email", authController.verifyEmail);
// authRouter.post("/resend-verification-email", authController.resendVerificationEmail);
// authRouter.post("/forgot-password", authController.forgotPassword);
// authRouter.post("/reset-password", authController.resetPassword);
// authRouter.post("/change-password", authController.changePassword);
// authRouter.post("/2fa/enable", authController.enableTwoFactorAuth);
// authRouter.post("/2fa/verify", authController.verifyTwoFactorAuth);

export default authRouter;

/*

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh-token`
- `POST /auth/verify-email`
- `POST /auth/resend-verification`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/change-password`
- `POST /auth/2fa/enable`
- `POST /auth/2fa/verify`


*/
