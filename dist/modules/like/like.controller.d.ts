import type { Request, Response } from "express";
import type { LikeService } from "./like.service.js";
export declare class LikeController {
    private service;
    constructor(service: LikeService);
    likes: (req: Request, res: Response, next: import("express").NextFunction) => void;
    likePost: (req: Request, res: Response, next: import("express").NextFunction) => void;
    unlikePost: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=like.controller.d.ts.map