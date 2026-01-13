import { createClient } from "redis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "./env.js";

const redisClient = createClient({
  username: "default",
  password: String(REDIS_PASSWORD),
  socket: {
    host: REDIS_HOST as string,
    port: Number(REDIS_PORT),
    tls: true,
    servername: REDIS_HOST as string,
  },
});

redisClient.on("connect", () => {
  console.log("Connected to Redis server successfully!");
});

redisClient.on("error", (err) => console.log("Redis redisClient Error", err));

export default redisClient;
