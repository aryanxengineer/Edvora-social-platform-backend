import type { Request, Response } from "express";
import type { UserService } from "./user.service.js";

import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";

export class UserController {
  // Controller methods will be defined here
  constructor(private userService: UserService) {}

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    // Logic to get all users
    const users = await this.userService.getAllUsers();
    return sendResponse({
      res,
      statusCode: 201,
      message: "Users fetched successfully",
      data: users,
    });
  });

  //   getUserById = asyncHandler(async (req: Request, res: Response) => {
  //     // Logic to get a user by ID
  //     const userId = req.params.id;
  //     const user = await this.userService.getUserById(userId);
  //     res.send(user);
  //   });
}
