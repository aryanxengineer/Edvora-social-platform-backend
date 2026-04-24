import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";
export class PostController {
    postService;
    constructor(postService) {
        this.postService = postService;
    }
    createPost = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        if (typeof userId !== "string") {
            throw new UnauthorizedError("Please login again for better experience");
        }
        // now we have sanitized and validated req.body here
        if (!req.file) {
            return sendResponse({
                res,
                statusCode: 400,
                message: "Image is required",
            });
        }
        await this.postService.createPost(userId, req.body, req.file);
        return sendResponse({
            res,
            statusCode: 201,
            message: "Post created successfully",
        });
    });
    getPostById = asyncHandler(async (req, res) => {
        const userId = req.user?.userId;
        const { postId } = req.params;
        if (!userId) {
            throw new UnauthorizedError();
        }
        if (!postId) {
            throw new BadRequestError("Post id must be provided in the url");
        }
        const post = await this.postService.getPostById(userId, postId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Successfully got the single post",
            data: post,
        });
    });
    getProfilePosts = asyncHandler(async (req, res) => {
        const { profileId } = req.params;
        if (!profileId) {
            throw new BadRequestError("Post id must be provided in the url");
        }
        const posts = await this.postService.getProfilePosts(profileId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Successfully got the single post",
            data: posts,
        });
    });
    deletePost = asyncHandler(async (req, res) => {
        const { postId } = req.params;
        if (!postId) {
            throw new BadRequestError("Post id must be provided in the url");
        }
        const post = await this.postService.deletePost(postId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Successfully deleted the single post",
        });
    });
}
//# sourceMappingURL=post.controller.js.map