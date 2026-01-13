import express, { type Express } from "express";
import {
  applyCors,
  applyHelmet,
  applyMongoSanitize,
} from "@/middlewares/security.middleware.js";
import { globalRateLimiter } from "@/middlewares/rateLimit.middleware.js";
import { httpLogger } from "@/middlewares/httpLogger.middleware.js";
import { globalErrorHandler } from "@/middlewares/error.middleware.js";
import indexRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app: Express = express();

// applyHelmet(app);
// applyCors(app);
// applyMongoSanitize(app);

app.use(globalRateLimiter);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(httpLogger);

app.use("/api/v1", indexRouter);

app.use(globalErrorHandler);

export default app;
