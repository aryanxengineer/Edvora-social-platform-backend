import type { Request, Response } from "express";
import type { ProfileService } from "./profile.service.js";
export declare class ProfileController {
    private service;
    constructor(service: ProfileService);
    myProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
    otherProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
    newAvatar: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=profile.controller.d.ts.map