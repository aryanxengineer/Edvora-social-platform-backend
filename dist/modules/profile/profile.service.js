import { BadRequestError } from "@common/errors/badRequest.error.js";
export class ProfileService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getMyProfile(userId) {
        const profile = await this.repo.findByUserId(userId);
        if (!profile) {
            throw new BadRequestError("Profile not found");
        }
        return profile;
    }
    async createProfile(data) {
        const existing = await this.repo.findByUserId(data.userId);
        if (existing)
            return; // idempotent safety
        return this.repo.create(data);
    }
    async getOtherProfile(profileId) {
        const profile = await this.repo.findById(profileId);
        if (!profile) {
            throw new BadRequestError("Profile not found");
        }
        return profile;
    }
    async newAvatar(userId, file) {
        const profile = await this.repo.findById(profileId);
        if (!profile) {
            throw new BadRequestError("Profile not found");
        }
        return profile;
    }
}
//# sourceMappingURL=profile.service.js.map