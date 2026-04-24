import { UserModel } from "@modules/user/user.model.js";
export class AuthRepository {
    async findUserByIdentifier(query) {
        return UserModel.findOne(query).select("+password").lean();
    }
    async findUserByEmail(email) {
        return UserModel.findOne({ email }).lean();
    }
    async createUser(data) {
        return UserModel.create(data);
    }
    async getUserById(userId) {
        return UserModel.findById(userId).lean();
    }
}
//# sourceMappingURL=auth.repository.js.map