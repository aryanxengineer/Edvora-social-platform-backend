import type { ProfileRepository } from "./profile.repository.js";

export class ProfileService {
    constructor(private profileRepository: ProfileRepository) {}

    myProfile = async (userId : string) => {
        return await this.profileRepository.myProfile(userId);
    }

}