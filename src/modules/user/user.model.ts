import { Schema, model } from "mongoose";
import { type IUser } from "./user.types.js";

const UserSchema = new Schema<IUser>(
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
    postCounts: { type: Number, default: 0 },
    reelCounts: { type: Number, default: 0 },
    followerCounts: { type: Number, default: 0 },
    followingCounts: { type: Number, default: 0 },
    savedPostCounts: { type: Number, default: 0 },
    phoneNumber: { type: String, unique: true, sparse: true },
    password: { type: String, required: true, select: false },
    dateOfBirth: { type: Date, required: true },
    profilePicture: { type: String, default: null },
    gender: { type: Number, enum: [0, 1, 2], default: 2 },
    isVerified: { type: Boolean, default: false },
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

// Indexing for performance

export const UserModel = model<IUser>("User", UserSchema);
