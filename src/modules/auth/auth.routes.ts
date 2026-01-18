import { Router } from "express";
import { AuthRepository } from "./auth.repository.js";
import { TokenService } from "@/common/auth/token.service.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

import {
  signInUserValidation,
  signupUserValidation,
} from "./auth.middleware.js";

const authRouter = Router();

// Dependency Injections for controller
const tokenService = new TokenService();
const authRepository = new AuthRepository();

const authService = new AuthService(authRepository, tokenService);
const authController = new AuthController(authService);

authRouter.post("/signup", signupUserValidation, authController.signUp);
authRouter.post("/signin", signInUserValidation, authController.signIn);
authRouter.post("/signout", authController.signOut);

export default authRouter;
