import { UserModel } from "@modules/user/user.model.js";

export class AuthRepository {
  async findUserByIdentifier(query: any) {
    return UserModel.findOne(query).select("+password").lean();
  }

  async findUserByEmail(email: string) {
    return UserModel.findOne({ email }).lean();
  }

  async createUser(data: any) {
    return UserModel.create(data);
  }

  async getUserById(userId: string) {
    return UserModel.findById(userId).lean();
  }
}