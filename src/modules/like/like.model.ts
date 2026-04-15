import mongoose, { Schema } from "mongoose";
import type { ILike } from "./like.types.js";

const likeSchema = new Schema<ILike>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

// 🚀 Prevent duplicate likes
likeSchema.index({ userId: 1, postId: 1 }, { unique: true });

const LikeModel = mongoose.model<ILike>("Like", likeSchema);
export default LikeModel;