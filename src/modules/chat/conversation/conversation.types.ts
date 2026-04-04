import type mongoose from "mongoose";

export interface IConversation extends Document {
  _id: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  lastMessageText?: string;
  lastMessageSender?: mongoose.Types.ObjectId | null; 
  lastMessage?: mongoose.Types.ObjectId | null;
  createdBy: mongoose.Types.ObjectId;
  unreadCount: object;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
