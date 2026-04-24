import { FeedService } from "./feed.service.js";
import { NextFunction, Request, Response } from "express";
export declare class FeedController {
    private feedService;
    constructor(feedService: FeedService);
    trending: (req: Request, res: Response, next: NextFunction) => void;
    followingFeed: (req: Request, res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=feed.controller.d.ts.map