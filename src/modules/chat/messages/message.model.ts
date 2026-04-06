import { Schema, model } from "mongoose";
import { type IMessage } from "./message.types.js";

const messageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 5000,
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ replyTo: 1 });

const MessageModel = model<IMessage>("Message", messageSchema);
export default MessageModel;
