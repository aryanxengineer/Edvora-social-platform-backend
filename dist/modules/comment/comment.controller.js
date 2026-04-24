import { asyncHandler } from "@common/utils/asyncHandler.js";
import { sendResponse } from "@common/utils/sendResponse.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";
export class CommentController {
    commentService;
    constructor(commentService) {
        this.commentService = commentService;
    }
    comments = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        const { postId } = req.params;
        if (!userId) {
            throw new UnauthorizedError();
        }
        if (!postId) {
            throw new BadRequestError();
        }
        const result = await this.commentService.getComments(postId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Comments fetched successfully",
            data: result,
        });
    });
    postComment = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        const { postId, content } = req.body;
        if (!userId) {
            throw new UnauthorizedError();
        }
        const result = await this.commentService.addComment(postId, content, userId);
        return sendResponse({
            res,
            statusCode: 201,
            message: "Comment successfully created",
            data: result,
        });
    });
    deleteComment = asyncHandler(async (req, res) => {
        const userId = req.session.user?.userId;
        const { commentId } = req.params;
        if (!userId) {
            throw new UnauthorizedError();
        }
        if (!commentId) {
            throw new BadRequestError();
        }
        const result = await this.commentService.deleteComent(commentId, userId);
        return sendResponse({
            res,
            statusCode: 200,
            message: "Comment deleted successfully",
        });
    });
}
//# sourceMappingURL=comment.controller.js.map