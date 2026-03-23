import { Schema, model } from "mongoose";
import { type IProfile } from "./profile.types.js";

const profileSchema = new Schema<IProfile>(
  {
    fullname: { type: String, required: true, trim: true, minlength: 2 },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    postCounts: { type: Number, default: 0 },
    reelCounts: { type: Number, default: 0 },
    savedPostCounts: { type: Number, default: 0 },
    dateOfBirth: { type: Date },
    avatar: { type: String, default: null },
    gender: { type: Number, enum: [0, 1, 2], default: 2 },
    accountVisibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProfileModel = model<IProfile>("Profile", profileSchema);
