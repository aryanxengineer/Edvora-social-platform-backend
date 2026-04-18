import { NotFoundError } from "@common/errors/notFound.error.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";

export class SearchService {
  constructor(private profileRepo: ProfileRepository) {}

  searchQuery = async (userId: string, search: string) => {
    const user = await this.profileRepo.findByUserId(userId);
    if(!user) {
        throw new UnauthorizedError();
    }

    const profiles = await this.profileRepo.searchQuery(search);
    if(!profiles) {
        throw new NotFoundError("Resource not found")
    }

    return profiles;
  }

}
