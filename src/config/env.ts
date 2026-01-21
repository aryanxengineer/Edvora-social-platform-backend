import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const {
  PORT,
  NODE_ENV,
  REDIS_URL,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  MONGO_URI,
  MONGO_RETRY_DELAY,
  MONGO_MAX_RETRIES,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_FOLDER,
  SESSION_SECRET,
} = process.env;
