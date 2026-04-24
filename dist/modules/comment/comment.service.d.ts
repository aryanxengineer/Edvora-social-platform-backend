import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { CommentRepository } from "./comment.repository.js";
import { PostRepository } from "@modules/post/post.repository.js";
export declare class CommentService {
    private commentRepository;
    private profileRepository;
    private postRepository;
    constructor(commentRepository: CommentRepository, profileRepository: ProfileRepository, postRepository: PostRepository);
    getComments: (postId: string) => Promise<(import("mongoose").Document<unknown, {}, import("./comment.types.js").IComment, {}, import("mongoose").DefaultSchemaOptions> & import("./comment.types.js").IComment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    addComment: (postId: string, content: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("./comment.types.js").IComment, {}, import("mongoose").DefaultSchemaOptions> & import("./comment.types.js").IComment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteComent: (commentId: string, userId: string) => Promise<void>;
}
//# sourceMappingURL=comment.service.d.ts.map