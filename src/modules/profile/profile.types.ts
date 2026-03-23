import type { Visibility } from "@modules/post/post.types.js";
import type mongoose from "mongoose";

export interface IProfile extends Document {
  username: string;
  fullname?: string;
  userId: mongoose.Types.ObjectId;
  email?: string;
  dateOfBirth?: Date;
  gender: number;
  avatar: string | null;
  bio?: string;
  postCounts: number;
  reelCounts: number;
  savedPostCounts: number;
  accountVisibility: Visibility;
  createdAt: Date;
  updatedAt: Date;
}
