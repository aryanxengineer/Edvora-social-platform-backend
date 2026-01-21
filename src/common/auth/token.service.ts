import jwt from "jsonwebtoken";

import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "@/config/env.js";

export class TokenService {
  // Generate access token
  generateAccessToken(payload: { userId: string }) {
    return jwt.sign(payload, JWT_ACCESS_SECRET as string, {
      expiresIn: "1d",
    });
  }

  // Generate refresh token and store in Redis with sessionId
  generateRefreshToken(payload: { userId: string }) {
    return jwt.sign(payload, JWT_REFRESH_SECRET as string, {
      expiresIn: "7d",
    });
  }

  // Verify access token
  verifyAccessToken(token: string) {
    return jwt.verify(token, JWT_ACCESS_SECRET as string);
  }

  // Verify refresh token
  verifyRefreshToken(token: string) {
    return jwt.verify(token, JWT_REFRESH_SECRET as string);
  }
}
