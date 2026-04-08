import { Router } from "express";
import { ProfileController } from "./profile.controller.js";
import { ProfileService } from "./profile.service.js";
import { ProfileRepository } from "./profile.repository.js";
import { requireAuth } from "@middlewares/authorization.middleware.js";

const router = Router();

const repo = new ProfileRepository();
const service = new ProfileService(repo);
const controller = new ProfileController(service);

router.use(requireAuth);

router.get("/me", controller.myProfile);

export default router;