import type { Request, Response } from "express";
import type { FollowService } from "./follow.service.js";
export declare class FollowController {
    private service;
    constructor(service: FollowService);
    isFollowed: (req: Request, res: Response, next: import("express").NextFunction) => void;
    follow: (req: Request, res: Response, next: import("express").NextFunction) => void;
    unfollow: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=follow.controller.d.ts.map