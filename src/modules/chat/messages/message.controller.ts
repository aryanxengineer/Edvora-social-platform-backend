import type { Request, Response } from "express";

import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { asyncHandler } from "@common/utils/asyncHandler.js";
import { MessageService } from "./message.service.js";

export class MessageController {
  constructor(private messageService: MessageService) {}

  public sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { content } = req.body;
    const { conversationId } = req.params;

    if (!userId || !conversationId || !content) {
      throw new UnauthorizedError("Please Login again");
    }

    const message = await this.messageService.sendMessage(
      userId,
      conversationId,
      content,
    );
  });
}
