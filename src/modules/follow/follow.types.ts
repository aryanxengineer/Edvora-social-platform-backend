import type mongoose from "mongoose";

export interface IFollow {
  _id: string;
  followerId: mongoose.Types.ObjectId; // who follows
  followingId: mongoose.Types.ObjectId; // whom they follow
  createdAt: Date;
}