// src/server.ts
import app from "./app.js";
import connectMongo from "@config/mongodb.js";
import { initializeWebSocketServer } from "@config/socket.js";
import { createServer } from "node:http";
import { connectRedis } from "@config/redis.js";
import { logger } from "@logger/index.js";
import { PORT } from "@config/env.js";
const httpServer = createServer(app);
initializeWebSocketServer(httpServer);
const startServer = async () => {
    await connectMongo();
    await connectRedis();
    httpServer.listen(PORT, () => {
        logger.info(`[SERVER] Running on port ${PORT}`);
    });
};
startServer();
export default httpServer;
//# sourceMappingURL=server.js.map