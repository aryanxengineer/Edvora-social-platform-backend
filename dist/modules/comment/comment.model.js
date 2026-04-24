import mongoose, { Schema } from "mongoose";
const CommentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        index: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000,
        trim: true,
    },
}, {
    timestamps: true,
});
CommentSchema.index({ postId: 1, createdAt: -1 });
const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
//# sourceMappingURL=comment.model.js.map