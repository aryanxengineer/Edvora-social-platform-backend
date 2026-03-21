import type { Document } from "mongoose";
import type { Visibility } from "@modules/post/post.types.js";

export interface IUser extends Document {
  fullname: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  dateOfBirth: Date;
  profilePicture?: string;
  gender?: number; // 0 = male, 1 = female, 2 = other (example)
  isVerified?: boolean;
  postCounts: number;
  reelCounts: number;
  followerCounts: number;
  followingCounts: number;
  savedPostCounts: number;
  accountVisibility: Visibility;
  createdAt: Date;
  updatedAt: Date;
}
