import cors from "cors";
import { type Express } from "express";

export const applyCors = (app: Express) => {
  const allowedOrigins = [
    "https://edvora-social-platform-frontend.vercel.app",
    "http://localhost:5173",
  ];

  const corsOptions = {
    origin: (origin: string | undefined, callback: any) => {
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(null, false); // ❗ no error throw
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));

  // ✅ handle preflight globally
  app.options("*", cors(corsOptions));
};