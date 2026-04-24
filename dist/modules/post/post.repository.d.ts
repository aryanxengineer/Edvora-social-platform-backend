import mongoose from "mongoose";
export declare class PostRepository {
    createPost(data: any, session?: mongoose.ClientSession): Promise<mongoose.Document<unknown, {}, import("./post.types.js").IPost, {}, mongoose.DefaultSchemaOptions> & import("./post.types.js").IPost & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findProfilePosts(profileId: string): Promise<(import("./post.types.js").IPost & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findById(postId: string): Promise<import("./post.types.js").IPost & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteById(postId: string, session?: mongoose.ClientSession): Promise<mongoose.mongo.DeleteResult>;
    incrementLikeCount(postId: string, session?: mongoose.ClientSession): Promise<mongoose.UpdateWriteOpResult>;
    decrementLikeCount(postId: string, session?: mongoose.ClientSession): Promise<mongoose.UpdateWriteOpResult>;
    find(profileId: string): Promise<(mongoose.Document<unknown, {}, import("./post.types.js").IPost, {}, mongoose.DefaultSchemaOptions> & import("./post.types.js").IPost & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findByProfileId(followingIds: string[]): Promise<(mongoose.Document<unknown, {}, import("./post.types.js").IPost, {}, mongoose.DefaultSchemaOptions> & import("./post.types.js").IPost & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
//# sourceMappingURL=post.repository.d.ts.map