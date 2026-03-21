import mongoose, { Schema, Types } from "mongoose";
import {
  PostVisibility,
  PostStatus,
} from "@common/enums/enums.js";

// common sub-schema
const EngagementSchema = new Schema(
  {
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    savesCount: { type: Number, default: 0 },
  },
  { _id: false }
);



const ReelSchema = new Schema(
  {
    authorId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🎥 Video (single only)
    video: {
      url: { type: String, required: true },
      duration: { type: Number, required: true }, // seconds
      width: Number,
      height: Number,
      thumbnailUrl: String,
    },

    caption: {
      type: String,
      maxlength: 2200,
      trim: true,
    },

    hashtags: {
      type: [String],
      index: true,
    },

    audioId: {
      type: Types.ObjectId,
      ref: "Audio",
      index: true,
    },

    visibility: {
      type: String,
      enum: Object.values(PostVisibility),
      default: PostVisibility.PUBLIC,
    },

    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.ACTIVE,
      index: true,
    },

    // 📊 Engagement
    engagement: EngagementSchema,

    // ⏱ Reel-specific metrics
    watchTime: {
      type: Number,
      default: 0, // total seconds watched
    },

    completionRate: {
      type: Number,
      default: 0, // % users who watched fully
    },

    // 🤖 Recommendation ranking
    score: {
      type: Number,
      default: 0,
      index: true,
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
  }
);

// ⚡ Reel Feed Index
ReelSchema.index({ score: -1, createdAt: -1 });
ReelSchema.index({ audioId: 1, createdAt: -1 });

export const ReelModel = mongoose.model("Reel", ReelSchema);
