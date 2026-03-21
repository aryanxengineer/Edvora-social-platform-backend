import { Document, Types } from "mongoose";

export type Visibility = "public" | "private";

export type PostImageType = {
  url: string;
  publicId: string;
};

export interface RequestedPostData {
  userId: Types.ObjectId;
  imageUrl: string;
  title?: string;
  caption?: string;
  location?: string;
  hashtags?: string[];
  mentions?: Types.ObjectId[];
}

export interface IPost extends Document {
  _id: Types.ObjectId;
  authorId: Types.ObjectId;
  authorUsername: string;
  authorAvatar: string;
  image: PostImageType;
  caption?: string;
  hashtags: string[];
  mentions: Types.ObjectId[];
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
