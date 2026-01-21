import { Types } from "mongoose";

export interface RequestedPostData {
  authorId: Types.ObjectId;
  imageUrl: string;
  title?: string;
  caption?: string;
  location?: string;
  hashtags?: string[];
  mentions?: Types.ObjectId[];
}

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
