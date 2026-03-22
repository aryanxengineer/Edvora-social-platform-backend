import { BadRequestError } from "@common/errors/badRequest.error.js";
import { UserModel } from "@modules/user/user.model.js";
import { ProfileModel } from "./profile.model.js";
import { InternalServerError } from "@common/errors/internal.error.js";

export class ProfileRepository {
  constructor() {}

  myProfile = async (userId: string) => {
    try {
      const isValidUser = await UserModel.findById(userId);
      if (!isValidUser) {
        throw new BadRequestError();
      }

      const profile = await ProfileModel.find({
        profileHandler: { $eq: userId },
      });

      if (!profile) {
        throw new InternalServerError();
      }

      return profile;

    } catch (error: any) {
      throw new InternalServerError("Internal Server Error: ", error?.message);
    }
  };
}
