import { AuthService } from "./auth.service.js";
import { Request, Response } from "express";
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    signUp: (req: Request, res: Response, next: import("express").NextFunction) => void;
    signIn: (req: Request, res: Response, next: import("express").NextFunction) => void;
    me: (req: Request, res: Response, next: import("express").NextFunction) => void;
    signOut: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=auth.controller.d.ts.map