import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { asyncHandler } from "@common/utils/asyncHandler.js";
export class MessageController {
    messageService;
    constructor(messageService) {
        this.messageService = messageService;
    }
    sendMessage = asyncHandler(async (req, res) => {
        const userId = req.user?.userId;
        const { content } = req.body;
        const { conversationId } = req.params;
        if (!userId || !conversationId || !content) {
            throw new UnauthorizedError("Please Login again");
        }
        const message = await this.messageService.sendMessage(userId, conversationId, content);
    });
}
//# sourceMappingURL=message.controller.js.map