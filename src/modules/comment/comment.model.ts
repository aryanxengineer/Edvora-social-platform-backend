import mongoose, { Schema, Types } from "mongoose";

const CommentSchema = new Schema(
  {
    postId: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },

    authorId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    text: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
    },

    parentCommentId: {
      type: Types.ObjectId,
      ref: "Comment",
      default: null,
      index: true,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    isReported: {
      type: Boolean,
      default: false,
    },

    reportCount: {
      type: Number,
      default: 0,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CommentSchema.index({ postId: 1, createdAt: -1 });
CommentSchema.index({ parentCommentId: 1, createdAt: 1 });

export const CommentModel = mongoose.model("Comment", CommentSchema);
