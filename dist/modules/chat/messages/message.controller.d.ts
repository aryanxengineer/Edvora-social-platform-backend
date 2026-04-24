import type { Request, Response } from "express";
import { MessageService } from "./message.service.js";
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    sendMessage: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=message.controller.d.ts.map