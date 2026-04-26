import cors from "cors";
import { type Express } from "express";

export const applyCors = (app: Express) => {
  const allowedOrigins = [
    "https://edvora-social-platform-frontend.vercel.app/", // prod frontend
    "http://localhost:5173", // dev frontend
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
