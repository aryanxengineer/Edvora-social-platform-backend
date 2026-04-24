import MessageModel from "./message.model.js";
import ConversationModel from "@modules/chat/conversation/conversation.model.js";
export class MessageService {
    messageRepository;
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    sendMessage = async (senderId, conversationId, content) => {
        const message = await MessageModel.create({
            senderId,
            conversationId,
            content,
        });
        await ConversationModel.findByIdAndUpdate(conversationId, {
            lastMessage: message._id,
            lastMessageText: content,
            lastMessageAt: new Date(),
        });
        return message;
    };
}
//# sourceMappingURL=message.service.js.map