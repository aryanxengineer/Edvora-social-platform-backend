import mongoose, { Schema, Types } from "mongoose";
import type { IPost } from "./post.types.js";

const PostSchema = new Schema<IPost>(
  {
    authorId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    sharesCount: {
      type: Number,
      default: 0,
    },

    savesCount: {
      type: Number,
      default: 0,
    },

    caption: {
      type: String,
      maxlength: 2200,
      trim: true,
    },

    comments: [{ type: Types.ObjectId, ref: "Comment" }],
    hashtags: [{ type: String, index: true }],
    mentions: [{ type: Types.ObjectId, ref: "User" }],
    isReported: { type: Boolean, default: false },
    reportCount: { type: Number, default: 0 },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

PostSchema.index({ authorId: 1, createdAt: -1 });
PostSchema.index({ hashtags: 1, createdAt: -1 });
PostSchema.index({ score: -1, createdAt: -1 });

export const PostModel = mongoose.model<IPost>("Post", PostSchema);
