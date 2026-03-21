import { Router } from "express";

import { AuthRepository } from "./auth.repository.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

import {
  signInUserValidation,
  signupUserValidation,
} from "./auth.middleware.js";
import { authRateLimiter } from "@middlewares/rateLimit.middleware.js";
import { requireAuth } from "@middlewares/authorization.middleware.js";

const authRouter = Router();

// Dependency Injections for controller
const authRepository = new AuthRepository();

const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.use(authRateLimiter);

authRouter.get("/me", requireAuth, authController.getMyDetails);
authRouter.post("/signup", signupUserValidation, authController.signUp);
authRouter.post("/signin", signInUserValidation, authController.signIn);
authRouter.post(
  "/signout-single-device",
  requireAuth,
  authController.signOutSingleDevice,
);
authRouter.post(
  "/signout-all-devices",
  requireAuth,
  authController.signOutAllDevices,
);
// authRouter.post("/verify-email", authController.verifyEmail);
// authRouter.post("/resend-verification-email", authController.resendVerificationEmail);
// authRouter.post("/forgot-password", authController.forgotPassword);
// authRouter.post("/reset-password", authController.resetPassword);
// authRouter.post("/change-password", authController.changePassword);
// authRouter.post("/2fa/enable", authController.enableTwoFactorAuth);
// authRouter.post("/2fa/verify", authController.verifyTwoFactorAuth);

export default authRouter;
