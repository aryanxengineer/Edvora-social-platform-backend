import mongoose from "mongoose";
import { ILike } from "./like.types.js";
export declare class LikeRepository {
    createLike(userId: string, postId: string, session?: mongoose.ClientSession): Promise<mongoose.Document<unknown, {}, ILike, {}, mongoose.DefaultSchemaOptions> & ILike & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteLike(userId: string, postId: string, session?: mongoose.ClientSession): Promise<mongoose.mongo.DeleteResult>;
    exists(userId: string, postId: string): Promise<{
        _id: string;
    }>;
    find(postId: string): Promise<ILike[] | []>;
    findByUserAndPostIds(userId: string, postIds: string[]): Promise<(mongoose.Document<unknown, {}, ILike, {}, mongoose.DefaultSchemaOptions> & ILike & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
//# sourceMappingURL=like.repository.d.ts.map