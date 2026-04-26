import helmet from "helmet";
import cors from "cors";
import { type Express } from "express";
import { NODE_ENV } from "@config/env.js";

export const applyHelmet = (app: Express) => {
  app.use(
    helmet({
      contentSecurityPolicy: false, // handled by frontend CDN
      crossOriginEmbedderPolicy: false,
    }),
  );
};

export const applyCors = (app: Express) => {
  const allowedOrigins = [
    "http://localhost:5173", // dev frontend
    "https://edvora-social-platform-frontend.vercel.app/", // prod frontend
  ];

  app.use(
    cors({
      // origin: "*",
      origin: (origin, callback) => {
        // Allow server-to-server & mobile apps
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }),
  );
};
