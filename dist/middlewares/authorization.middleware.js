import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
export const requireAuth = (req, res, next) => {
    console.log(req.session.user);
    if (!req.session?.user) {
        throw new UnauthorizedError();
    }
    req.user = {
        userId: req.session.user.userId,
    };
    next();
};
//# sourceMappingURL=authorization.middleware.js.map