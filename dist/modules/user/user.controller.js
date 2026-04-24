import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
export class UserController {
    userService;
    // Controller methods will be defined here
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsers = asyncHandler(async (req, res) => {
        // Logic to get all users
        const users = await this.userService.getAllUsers();
        return sendResponse({
            res,
            statusCode: 201,
            message: "Users fetched successfully",
            data: users,
        });
    });
}
//# sourceMappingURL=user.controller.js.map