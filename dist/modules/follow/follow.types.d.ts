import type mongoose from "mongoose";
export interface IFollow {
    _id: string;
    followerId: mongoose.Types.ObjectId;
    followingId: mongoose.Types.ObjectId;
    createdAt: Date;
}
//# sourceMappingURL=follow.types.d.ts.map