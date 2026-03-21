import { Document, Types } from "mongoose";

export type Visibility = "public" | "private";

export type PostImageType = {
  url: string;
  publicId: string;
};

export interface IPost extends Document {
  _id: Types.ObjectId;
  authorId: Types.ObjectId;
  authorUsernameSnapshot: string;
  authorAvatar: string;
  image: PostImageType;
  caption?: string;
  hashtags: string[];
  mentions: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  savesCount: number;
  isReported: boolean;
  reportCount: number;
  visibility: Visibility;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
