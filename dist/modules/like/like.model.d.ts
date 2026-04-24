import mongoose from "mongoose";
import type { ILike } from "./like.types.js";
declare const LikeModel: mongoose.Model<ILike, {}, {}, {}, mongoose.Document<unknown, {}, ILike, {}, mongoose.DefaultSchemaOptions> & ILike & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILike>;
export default LikeModel;
//# sourceMappingURL=like.model.d.ts.map