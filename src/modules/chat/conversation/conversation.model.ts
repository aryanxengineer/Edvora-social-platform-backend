import mongoose, { Schema, model } from "mongoose";
import { type IConversation } from "./conversation.types.js";
import type { NextFunction } from "express";

const conversationSchema = new Schema<IConversation>(
  {
    participants: {
      type: [Schema.Types.ObjectId],
      required: true,
      validate: {
        validator: function (val: mongoose.Types.ObjectId[]) {
          return val.length === 2;
        },
      },
    },

    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    lastMessageText: String,

    lastMessageSender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    lastMessageAt: Date,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    unreadCount: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true },
);

conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageAt: -1 });

conversationSchema.pre<IConversation>("save", function (next) {
  this.participants.sort();
  next;
});

const ConversationModel = model<IConversation>(
  "Conversation",
  conversationSchema,
);
export default ConversationModel;
