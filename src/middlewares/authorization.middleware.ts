import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import type { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  console.log('yaha tak bhi aa gya chalo thik hai');
  
  if (!req.session?.user) {
    throw new UnauthorizedError();
  }
  
  req.user = {
    userId: req.session.user.userId,
  };
  
  
  console.log('yaha tak kaise aa gya thik nahi hai');

  return;

  next();
};
