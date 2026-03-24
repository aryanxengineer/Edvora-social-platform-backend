import { NotFoundError } from "@common/errors/notFound.error.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { ProfileModel } from "@modules/profile/profile.model.js";
import { FollowModel } from "./follow.model.js";
import { InternalServerError } from "@common/errors/internal.error.js";

export class FollowRepository {
  constructor() {}

  // follow user functionality
  public followProfile = async (userId: string, otherProfileId: string) => {
    try {
      const userProfile = await ProfileModel.findOne({
        userId,
      });

      if (!userProfile) {
        throw new UnauthorizedError();
      }

      const otherUserProfile = await ProfileModel.findOne({
        _id: otherProfileId,
      });

      if (!otherUserProfile) {
        throw new NotFoundError("Other user profile not found");
      }

      const userFollowData = await FollowModel.findOneAndUpdate(
        {
          profileId: userProfile._id,
          following: { $ne: otherUserProfile._id }, // prevent duplicate follow
        },
        {
          $addToSet: { following: otherUserProfile._id },
          $inc: { followingCounts: 1 },
        },
        { new: true, upsert: true },
      );

      const otherUserFollowData = await FollowModel.findOneAndUpdate(
        {
          profileId: otherUserProfile._id,
          followers: { $ne: userProfile._id },
        },
        {
          $addToSet: { followers: userProfile._id },
          $inc: { followerCounts: 1 },
        },
        { new: true, upsert: true },
      );

      return;
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  };

  // unfollow user functionality
  public unfollowProfile = async (userId: string, otherProfileId: string) => {
    try {
      const userProfile = await ProfileModel.findOne({ userId });

      if (!userProfile) {
        throw new UnauthorizedError();
      }

      const otherUserProfile = await ProfileModel.findById(otherProfileId);

      if (!otherUserProfile) {
        throw new NotFoundError("Other user profile not found");
      }

      const userFollowData = await FollowModel.findOneAndUpdate(
        {
          profileId: userProfile._id,
          following: otherUserProfile._id, // must exist to unfollow
        },
        {
          $pull: { following: otherUserProfile._id },
          $inc: { followingCounts: -1 },
        },
        { new: true },
      );

      const otherUserFollowData = await FollowModel.findOneAndUpdate(
        {
          profileId: otherUserProfile._id,
          followers: userProfile._id,
        },
        {
          $pull: { followers: userProfile._id },
          $inc: { followerCounts: -1 },
        },
        { new: true },
      );

      return;
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  };

  // follow user functionality
  public followBackProfile = async () => {};

  // follow user functionality
  public profileFollowers = async (
    profileId: string,
    limit: number = 10,
    offset: number = 0,
  ) => {
    try {
      const result = await FollowModel.findOne(
        { profileId },
        {
          followers: { $slice: [offset, limit] },
        },
      )
        .populate({
          path: "followers",
          select: "username avatar",
          options: { lean: true },
        })
        .lean();

      return result?.followers ?? [];
    } catch (error) {
      throw new InternalServerError(
        "Internal Server Error: Followers are not fetched",
      );
    }
  };

  // follow user functionality
  public profileFollowings = async () => {};
}
