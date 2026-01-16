import { Types } from "mongoose";

export interface IPost {
  _id: Types.ObjectId;
  authorId: Types.ObjectId;
  imageUrl: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  savesCount: number;
  caption?: string;
  comments: Types.ObjectId[];
  hashtags: string[];
  mentions: Types.ObjectId[];
  isReported: boolean;
  reportCount: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
