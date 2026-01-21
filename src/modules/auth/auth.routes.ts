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

export default authRouter;
