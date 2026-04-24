import express from "express";
import { applyCors, applyHelmet, } from "@middlewares/security.middleware.js";
import { absoluteExpirySessionAt } from "@middlewares/absoluteExpiry.middleware.js";
import { globalErrorHandler } from "@middlewares/error.middleware.js";
import { globalRateLimiter } from "@middlewares/rateLimit.middleware.js";
import { sessionMiddleware } from "@middlewares/session.middleware.js";
import { httpLogger } from "@middlewares/httpLogger.middleware.js";
import indexRouter from "@routes/index.js";
const app = express();
/**
 * -------------------------------
 * 1. Infra-level configuration
 * -------------------------------
 */
app.set("trust proxy", 1);
/**
 * -------------------------------
 * 2. Security layer (global)
 * -------------------------------
 */
applyHelmet(app);
applyCors(app);
/**
 * -------------------------------
 * 3. Observability
 * -------------------------------
 */
app.use(httpLogger);
/**
 * -------------------------------
 * 4. Abuse protection
 * -------------------------------
 */
app.use(globalRateLimiter);
/**
 * -------------------------------
 * 5. Body parsing
 * -------------------------------
 */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
/**
 * -------------------------------
 * 6. Public routes (NO session)
 * -------------------------------
 * ⚡ Performance optimization:
 * Avoid Redis/session hit for public endpoints
 * app.use("/api/v1", publicRouter);
 */
/**
 * -------------------------------
 * 7. Session layer (only where needed)
 * -------------------------------
 */
app.use(sessionMiddleware);
app.use(absoluteExpirySessionAt);
/**
 * -------------------------------
 * 8. all routes
 * -------------------------------
 */
app.use("/api/v1", indexRouter);
/**
 * -------------------------------
 * 9. Global error handler (LAST)
 * -------------------------------
 */
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map