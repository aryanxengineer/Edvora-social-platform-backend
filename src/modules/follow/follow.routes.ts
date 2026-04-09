import { Router } from "express";
import { FollowController } from "./follow.controller.js";
import { FollowService } from "./follow.service.js";
import { FollowRepository } from "./follow.repository.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { requireAuth } from "@middlewares/authorization.middleware.js";

const router = Router();

const followRepo = new FollowRepository();
const profileRepo = new ProfileRepository();

const service = new FollowService(followRepo, profileRepo);
const controller = new FollowController(service);

router.use(requireAuth);

router.post("/", controller.follow);
router.delete("/", controller.unfollow);

export default router;
