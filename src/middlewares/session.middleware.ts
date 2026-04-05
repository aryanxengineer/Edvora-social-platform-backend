import session from "express-session";

import { RedisStore as ConnectRedisStore } from "connect-redis";

import { NODE_ENV, SESSION_SECRET } from "@config/env.js";
import { redis } from "@config/redis.js";


const store = new ConnectRedisStore({
  client: redis,
  prefix: "sess:",
  ttl: 60 * 60 * 24 * 30,
  disableTouch: false,
});

export const sessionMiddleware = session({
  name: "sessionId",
  store,
  secret: SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  rolling: true, // refresh expiry on activity
  
  cookie: {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
});