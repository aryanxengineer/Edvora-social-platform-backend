import type { Request, Response } from "express";
import type { UserService } from "./user.service.js";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=user.controller.d.ts.map