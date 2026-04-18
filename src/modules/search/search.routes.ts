import { Router } from "express";
import { SearchService } from "./search.service.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { SearchController } from "./search.controller.js";

const searchRouter = Router();

const profileRepository = new ProfileRepository();
const searchService = new SearchService(profileRepository);
const searchController = new SearchController(searchService)


searchRouter.get("/profiles", searchController.searchQuery);

export default searchRouter;
