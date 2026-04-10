import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10, // per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
});


export const authRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many attempts.",
  },
});