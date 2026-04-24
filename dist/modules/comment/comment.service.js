import { BadRequestError } from "@common/errors/badRequest.error.js";
import { InternalServerError } from "@common/errors/internal.error.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
export class CommentService {
    commentRepository;
    profileRepository;
    postRepository;
    constructor(commentRepository, profileRepository, postRepository) {
        this.commentRepository = commentRepository;
        this.profileRepository = profileRepository;
        this.postRepository = postRepository;
    }
    getComments = async (postId) => {
        const post = await this.postRepository.findById(postId);
        if (!post) {
            throw new BadRequestError("Post not found");
        }
        const comment = await this.commentRepository.getComments(postId);
        if (!comment) {
            throw new BadRequestError();
        }
        return comment;
    };
    addComment = async (postId, content, userId) => {
        const userprofile = await this.profileRepository.findByUserId(userId);
        if (!userprofile) {
            throw new UnauthorizedError("User profile not found");
        }
        const post = await this.postRepository.findById(postId);
        if (!post) {
            throw new BadRequestError("Post not found");
        }
        const comment = await this.commentRepository.create(postId, content, userId);
        if (!comment) {
            throw new InternalServerError();
        }
        return comment;
    };
    deleteComent = async (commentId, userId) => {
        const userprofile = await this.profileRepository.findByUserId(userId);
        if (!userprofile) {
            throw new UnauthorizedError("User profile not found");
        }
        const comment = await this.commentRepository.deleteById(commentId);
        if (!comment) {
            throw new BadRequestError("Comment does not exists");
        }
        return;
    };
}
//# sourceMappingURL=comment.service.js.map