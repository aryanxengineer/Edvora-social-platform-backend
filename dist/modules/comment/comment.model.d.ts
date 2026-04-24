import mongoose from "mongoose";
import { IComment } from "./comment.types.js";
declare const CommentModel: mongoose.Model<IComment, {}, {}, {}, mongoose.Document<unknown, {}, IComment, {}, mongoose.DefaultSchemaOptions> & IComment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IComment>;
export default CommentModel;
//# sourceMappingURL=comment.model.d.ts.map