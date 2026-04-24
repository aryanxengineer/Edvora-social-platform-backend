import { createClient } from "redis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, } from "./env.js";
/**
 * Validate env early (fail fast)
 */
if (!REDIS_HOST)
    throw new Error("REDIS_HOST is required");
if (!REDIS_PASSWORD)
    throw new Error("REDIS_PASSWORD is required");
const port = Number(REDIS_PORT ?? 13444);
if (Number.isNaN(port)) {
    throw new Error("REDIS_PORT must be a number");
}
/**
 * Redis client (singleton)
 */
export const redis = createClient({
    username: "default", // Redis Cloud ACL user
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port,
        reconnectStrategy: (retries) => {
            // exponential backoff (max 2s)
            return Math.min(retries * 100, 2000);
        },
    },
});
/**
 * Observability hooks
 */
redis.on("connect", () => {
    console.log("[Redis] socket connected");
});
redis.on("ready", () => {
    console.log("[Redis] ready");
});
redis.on("reconnecting", () => {
    console.warn("[Redis] reconnecting");
});
redis.on("end", () => {
    console.warn("[Redis] connection closed");
});
redis.on("error", (err) => {
    console.error("[Redis] error:", err.message);
});
/**
 * Explicit connect function
 * (called from server bootstrap)
 */
export async function connectRedis() {
    if (!redis.isOpen) {
        await redis.connect();
    }
}
//# sourceMappingURL=redis.js.map