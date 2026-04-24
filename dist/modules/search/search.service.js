import { NotFoundError } from "@common/errors/notFound.error.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
export class SearchService {
    profileRepo;
    constructor(profileRepo) {
        this.profileRepo = profileRepo;
    }
    searchQuery = async (userId, search) => {
        const user = await this.profileRepo.findByUserId(userId);
        if (!user) {
            throw new UnauthorizedError();
        }
        const profiles = await this.profileRepo.searchQuery(search);
        if (!profiles) {
            throw new NotFoundError("Resource not found");
        }
        return profiles;
    };
}
//# sourceMappingURL=search.service.js.map