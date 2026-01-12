import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { AuthApplicationService } from "./auth.application.js";
import { AuthService } from "./auth.service.js";
import { TokenService } from "@/common/auth/token.service.js";

import {
  signInUserValidation,
  signupUserValidation,
} from "./auth.middleware.js";

const authRouter = Router();

// Dependency Injections for controller
const authService = new AuthService();
const tokenService = new TokenService();
const authAppService = new AuthApplicationService(authService, tokenService);

const controller = new AuthController(authAppService);

authRouter.post("/signup", signupUserValidation, controller.signUp);
authRouter.post("/signin", signInUserValidation, controller.signIn);
authRouter.post("/signout", controller.signOut);

export default authRouter;
