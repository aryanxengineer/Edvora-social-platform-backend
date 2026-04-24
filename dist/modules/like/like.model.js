import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema({
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
}, {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
});
// 🚀 Prevent duplicate likes
likeSchema.index({ userId: 1, postId: 1 }, { unique: true });
const LikeModel = mongoose.model("Like", likeSchema);
export default LikeModel;
//# sourceMappingURL=like.model.js.map