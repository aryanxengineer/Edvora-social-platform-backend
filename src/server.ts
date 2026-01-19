// src/server.ts
import connectMongo from "@/config/mongodb.js";
import { connectRedis } from "@/config/redis.js";
import { PORT } from "@/config/env.js";

import app from "./app.js";
import { createServer } from "node:http";

import { logger } from "@/logger/index.js";

const httpServer = createServer(app);

const startServer = async () => {
  await connectMongo();
  await connectRedis();

  httpServer.listen(PORT, () => {
    logger.info(`[SERVER] Running on port ${PORT}`);
  });
};

startServer();

export default httpServer;
