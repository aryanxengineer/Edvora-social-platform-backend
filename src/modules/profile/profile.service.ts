import { ProfileModel } from "./profile.model.js";
import { ProfileRepository } from "./profile.repository.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";

export class ProfileService {
  constructor(private repo: ProfileRepository) {}

  async getMyProfile(userId: string) {
    const profile = await this.repo.findByUserId(userId);

    if (!profile) {
      throw new BadRequestError("Profile not found");
    }

    return profile;
  }

  async createProfile(data: any) {
    const existing = await this.repo.findByUserId(data.userId);

    if (existing) return; // idempotent safety

    return this.repo.create(data);
  }

  
}
