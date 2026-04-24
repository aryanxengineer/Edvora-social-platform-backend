import mongoose from "mongoose";
import type { IFollow } from "./follow.types.js";
export declare const FollowModel: mongoose.Model<IFollow, {}, {}, {}, mongoose.Document<unknown, {}, IFollow, {}, mongoose.DefaultSchemaOptions> & IFollow & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, IFollow>;
//# sourceMappingURL=follow.model.d.ts.map