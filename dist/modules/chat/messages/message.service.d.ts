import { MessageRepository } from "./message.repository.js";
export declare class MessageService {
    private messageRepository;
    constructor(messageRepository: MessageRepository);
    sendMessage: (senderId: string, conversationId: string, content: string) => Promise<import("mongoose").Document<unknown, {}, import("./message.types.js").IMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./message.types.js").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
//# sourceMappingURL=message.service.d.ts.map