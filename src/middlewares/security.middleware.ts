import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
import { type Express } from "express";

export const applyHelmet = (app: Express) => {
  app.use(
    helmet({
      contentSecurityPolicy: false, // handled by frontend CDN
      crossOriginEmbedderPolicy: false,
    }),
  );
};

export const applyCors = (app: Express) => {
  app.use(
    cors({
      // origin: "*",
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:5173",
          
        ];

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
