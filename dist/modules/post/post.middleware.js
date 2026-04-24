import { newPostSchema } from "./post.schema.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";
export const validateNewPost = (req, _res, next) => {
    const formattedPostData = {
        imageUrl: req.file?.originalname, // FIX
        title: req.body?.title,
        caption: req.body?.caption,
        location: req.body?.location,
        tags: req.body?.tags,
        mentions: req.body?.mentions,
    };
    const result = newPostSchema.safeParse(formattedPostData);
    if (!result.success) {
        return next(new BadRequestError("Invalid new posts payload", result.error.flatten()));
    }
    // sanitized + transformed data overwrite
    req.body = result.data;
    next();
};
//# sourceMappingURL=post.middleware.js.map