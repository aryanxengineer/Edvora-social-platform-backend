import { Router } from "express";

import { ProfileController } from "./profile.controller.js";
import { ProfileService } from "./profile.service.js";
import { ProfileRepository } from "./profile.repository.js";
import { requireAuth } from "@middlewares/authorization.middleware.js";

const profileRouter = Router();

const profileRepositoryInstance = new ProfileRepository();
const profileServiceInstance = new ProfileService(profileRepositoryInstance);
const profileControllerInstance = new ProfileController(profileServiceInstance);

profileRouter.use(requireAuth);

profileRouter.get("/", profileControllerInstance.myProfile);

export default profileRouter;
