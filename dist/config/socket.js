import { Server } from "socket.io";
import ConversationModel from "@modules/chat/conversation/conversation.model.js";
import { MessageService } from "@modules/chat/messages/message.service.js";
import { MessageRepository } from "@modules/chat/messages/message.repository.js";
const messageService = new MessageService(new MessageRepository());
const userSocketMap = new Map();
export const initializeWebSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        // store connection
        userSocketMap.set(userId, socket.id);
        console.log("User connected:", userId);
        // send message
        socket.on("send_message", async (data) => {
            const { conversationId, content } = data;
            // find receiver
            const conversation = await ConversationModel.findById(conversationId);
            const receiverId = conversation?.participants.find((id) => id.toString() !== userId);
            // save message
            const message = await messageService.sendMessage(userId, conversationId, content);
            console.log(message);
            // emit to receiver
            const receiverSocket = userSocketMap.get(receiverId?.toString());
            if (receiverSocket) {
                io.to(receiverSocket).emit("receive_message", message);
            }
        });
        socket.on("disconnect", () => {
            userSocketMap.delete(userId);
            console.log("User disconnected:", userId);
        });
    });
};
//# sourceMappingURL=socket.js.map