import type { UserRepository } from "./user.repository.js";

export class UserService {
    // Service methods will be defined here
    constructor(private userRepository: UserRepository) {}

    getAllUsers = async () => {
        // Logic to call the repository and return all users
        const users = await this.userRepository.getAllUsers();
        return users;
    }
}