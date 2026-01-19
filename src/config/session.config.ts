import session from "express-session";

import { redis } from "@/config/redis.js";
import { SESSION_SECRET } from "./env.js";

import { RedisStore as ConnectRedisStore } from "connect-redis";

const store = new ConnectRedisStore({
  client: redis,
  prefix: "sess:",
  ttl: 60 * 60 * 24 * 7,
  disableTouch: false,
});

export const sessionMiddleware = session({
  name: "sessionId",
  store,
  secret: SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});
