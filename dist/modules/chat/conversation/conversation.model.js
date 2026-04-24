import { Schema, model } from "mongoose";
const conversationSchema = new Schema({
    participants: {
        type: [Schema.Types.ObjectId],
        required: true,
        validate: {
            validator: function (val) {
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
}, { timestamps: true });
conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageAt: -1 });
conversationSchema.pre("save", function (next) {
    this.participants.sort();
    next;
});
const ConversationModel = model("Conversation", conversationSchema);
export default ConversationModel;
//# sourceMappingURL=conversation.model.js.map