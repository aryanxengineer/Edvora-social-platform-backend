export class UserService {
    userRepository;
    // Service methods will be defined here
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAllUsers = async () => {
        // Logic to call the repository and return all users
        const users = await this.userRepository.getAllUsers();
        return users;
    };
}
//# sourceMappingURL=user.service.js.map