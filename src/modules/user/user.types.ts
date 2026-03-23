import type { Document } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  dateOfBirth: Date;
  gender?: number; // 0 = male, 1 = female, 2 = other (example)
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
