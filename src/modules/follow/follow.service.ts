import { BadRequestError } from "@common/errors/badRequest.error.js";
import type { FollowRepository } from "./follow.repository.js";

export class FollowService {
  constructor(private followRepository: FollowRepository) {}

  public followProfile = async (userId: string, otherProfileId: string) => {
    if (!userId || !otherProfileId) {
      throw new BadRequestError("Invalid userId or other profile Id");
    }

    await this.followRepository.followProfile(userId, otherProfileId);

    return;
  };
  public unfollowProfile = async (userId: string, otherProfileId: string) => {
    if (!userId || !otherProfileId) {
      throw new BadRequestError("Invalid userId or other profile Id");
    }

    await this.followRepository.unfollowProfile(userId, otherProfileId);

    return;
  };
  public followBackProfile = async () => {};


  public profileFollowers = async (profileId: string) => {
    if(!profileId) {
      throw new BadRequestError("Invalid profile id");
    }

    const followersData = await this.followRepository.profileFollowers(profileId);
    return followersData;
  };
  public profileFollowings = async () => {};
}
