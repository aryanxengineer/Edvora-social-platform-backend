import { type RedisClientType } from "redis";
/**
 * Redis client (singleton)
 */
export declare const redis: RedisClientType;
/**
 * Explicit connect function
 * (called from server bootstrap)
 */
export declare function connectRedis(): Promise<void>;
//# sourceMappingURL=redis.d.ts.map