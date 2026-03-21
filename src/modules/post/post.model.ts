import mongoose, { Schema } from "mongoose";
import type { IPost } from "./post.types.js";

const PostSchema = new Schema<IPost>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    authorUsernameSnapshot: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
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
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    hashtags: [{ type: String, index: true }],
    mentions: {
      type: [String],
    },
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
