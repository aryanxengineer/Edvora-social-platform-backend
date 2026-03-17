import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        // future me aur fields add kar sakte ho
        // role?: string;
      };
    }
  }
}