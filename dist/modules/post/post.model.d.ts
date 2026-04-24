import mongoose from "mongoose";
import type { IPost } from "./post.types.js";
export declare const PostModel: mongoose.Model<IPost, {}, {}, {}, mongoose.Document<unknown, {}, IPost, {}, mongoose.DefaultSchemaOptions> & IPost & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IPost>;
//# sourceMappingURL=post.model.d.ts.map