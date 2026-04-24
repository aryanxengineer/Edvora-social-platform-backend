import { CommentService } from "./comment.service.js";
import { Request, Response } from "express";
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    comments: (req: Request, res: Response, next: import("express").NextFunction) => void;
    postComment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    deleteComment: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=comment.controller.d.ts.map