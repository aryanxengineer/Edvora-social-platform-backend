import { UserModel } from "./user.model.js";
export class UserRepository {
    // Repository methods will be defined here
    getAllUsers = async () => {
        // Logic to interact with the database and fetch all users
        const users = await UserModel.find();
        return users;
    };
}
//# sourceMappingURL=user.repository.js.map