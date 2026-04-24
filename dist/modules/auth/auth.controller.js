import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
export class AuthController {
    service;
    constructor(service) {
        this.service = service;
    }
    signUp = asyncHandler(async (req, res) => {
        const user = await this.service.register(req.body);
        req.session.user = {
            userId: user.id,
        };
        return sendResponse({
            res,
            statusCode: 201,
            message: "User registered",
            data: user,
        });
    });
    signIn = asyncHandler(async (req, res) => {
        const user = await this.service.login(req.body);
        await new Promise((resolve, reject) => {
            req.session.regenerate((err) => {
                if (err)
                    return reject(new UnauthorizedError("Session error"));
                req.session.user = {
                    userId: user.id,
                };
                req.session.save((err) => {
                    if (err)
                        return reject(err);
                    resolve();
                });
            });
        });
        return sendResponse({
            res,
            statusCode: 200,
            message: "Login successful",
            data: user,
        });
    });
    me = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        if (!userId) {
            throw new UnauthorizedError();
        }
        const user = await this.service.getUser(userId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "User fetched",
            data: user,
        });
    });
    signOut = asyncHandler(async (req, res) => {
        req.session.destroy(() => { });
        res.clearCookie("connect.sid");
        return sendResponse({
            res,
            statusCode: 200,
            message: "Logged out",
        });
    });
}
//# sourceMappingURL=auth.controller.js.map