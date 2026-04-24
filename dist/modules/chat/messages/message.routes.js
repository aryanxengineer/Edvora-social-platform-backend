import { Router } from 'express';
import { MessageService } from './message.service.js';
import { MessageController } from './message.controller.js';
import { MessageRepository } from './message.repository.js';
const messageRouter = Router();
const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService);
// messageRouter.use(requireAuth);
messageRouter.post('/send-message/:conversationId', messageController.sendMessage);
//# sourceMappingURL=message.routes.js.map