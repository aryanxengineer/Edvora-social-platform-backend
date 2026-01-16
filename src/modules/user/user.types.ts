import type { Types } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  username: string;
  email?: string;
  comments?: Types.ObjectId[];
  posts?: Types.ObjectId[];
  reels?: Types.ObjectId[];
  phoneNumber?: string;
  password: string;
  dateOfBirth: Date;
  profilePicture?: string;
  gender?: number; // 0 = male, 1 = female, 2 = other (example)
  isVerified?: boolean,
  createdAt: Date;
  updatedAt: Date;
}