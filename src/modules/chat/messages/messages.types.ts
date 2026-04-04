import type mongoose from "mongoose";

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  conversationId: mongoose.Types.ObjectId; 
  senderId: mongoose.Types.ObjectId;
  content: string;
  replyTo?: mongoose.Types.ObjectId; 
  status: "sent" | "delivered" | "read" | "pending"; 
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}