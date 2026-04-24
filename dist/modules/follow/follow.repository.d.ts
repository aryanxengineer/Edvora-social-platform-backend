import mongoose from "mongoose";
export declare class FollowRepository {
    create(followerId: string, followingId: string, session?: mongoose.ClientSession): Promise<mongoose.Document<unknown, {}, import("./follow.types.js").IFollow, {}, mongoose.DefaultSchemaOptions> & import("./follow.types.js").IFollow & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    delete(followerId: string, followingId: string, session?: mongoose.ClientSession): Promise<mongoose.mongo.DeleteResult>;
    exists(followerId: string, followingId: string): Promise<{
        _id: string;
    }>;
    find(userId: string): Promise<(mongoose.Document<unknown, {}, import("./follow.types.js").IFollow, {}, mongoose.DefaultSchemaOptions> & import("./follow.types.js").IFollow & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
//# sourceMappingURL=follow.repository.d.ts.map