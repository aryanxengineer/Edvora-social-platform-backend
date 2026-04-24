import mongoose from "mongoose";
export declare class CommentRepository {
    constructor();
    create: (postId: string, content: string, userId: string) => Promise<mongoose.Document<unknown, {}, import("./comment.types.js").IComment, {}, mongoose.DefaultSchemaOptions> & import("./comment.types.js").IComment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getComments: (postId: string) => Promise<(mongoose.Document<unknown, {}, import("./comment.types.js").IComment, {}, mongoose.DefaultSchemaOptions> & import("./comment.types.js").IComment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    find: (postId: string) => Promise<(import("./comment.types.js").IComment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteById: (commentId: string) => Promise<mongoose.Document<unknown, {}, import("./comment.types.js").IComment, {}, mongoose.DefaultSchemaOptions> & import("./comment.types.js").IComment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getCommentsCountByPostIds(postIds: string[]): Promise<Map<any, any>>;
}
//# sourceMappingURL=comment.repository.d.ts.map