import { FollowRepository } from "./follow.repository.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
export declare class FollowService {
    private followRepo;
    private profileRepo;
    constructor(followRepo: FollowRepository, profileRepo: ProfileRepository);
    isFollowed(userId: string, profileId: string): Promise<{
        isFollowed: boolean;
    }>;
    follow(userId: string, profileId: string): Promise<void>;
    unfollow(userId: string, profileId: string): Promise<void>;
}
//# sourceMappingURL=follow.service.d.ts.map