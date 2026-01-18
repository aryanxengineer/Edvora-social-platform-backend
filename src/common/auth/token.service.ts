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
  async generateRefreshToken(payload: { userId: string }) {
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET as string, {
      expiresIn: "7d",
    });

    return { refreshToken };
  }
}
