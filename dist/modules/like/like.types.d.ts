import type mongoose from "mongoose";
export interface ILike {
    _id: string;
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    createdAt: Date;
}
//# sourceMappingURL=like.types.d.ts.map