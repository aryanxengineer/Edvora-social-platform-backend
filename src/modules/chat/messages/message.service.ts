import MessageModel from "./message.model.js";
import ConversationModel from "@modules/chat/conversation/conversation.model.js";
import { MessageRepository } from "./message.repository.js";

export class MessageService {

  constructor(private messageRepository: MessageRepository) {}


  sendMessage = async (
    senderId: string,
    conversationId: string,
    content: string,
  ) => {
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
