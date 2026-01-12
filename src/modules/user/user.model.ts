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
    phoneNumber: { type: String, unique: true, sparse: true }, // sparse allows null/optional unique
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    profilePicture: { type: String, default: null },
    gender: { type: Number, enum: [0, 1, 2], default: 2 },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true, // auto add createdAt, updatedAt
    versionKey: false,
  }
);

// Indexing for performance

export const UserModel = model<IUser>("User", UserSchema);
