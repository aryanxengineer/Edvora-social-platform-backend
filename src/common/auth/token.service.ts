import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "@/config/env.js";
import jwt from "jsonwebtoken";
import redisClient from "@/config/redis.js";

export class TokenService {
  generateAccessToken(payload: { userId: string }) {
    return jwt.sign(payload, JWT_ACCESS_SECRET as string, {
      expiresIn: "1d",
    });
  }

  // Generate refresh token and store in Redis with sessionId
  async generateRefreshToken(payload: { userId: string; device?: string }) {
    const sessionId = crypto.randomUUID(); // unique per device
    const refreshToken = jwt.sign(
      { userId: payload.userId, sessionId },
      JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    // Store in Redis
    await redisClient.set(
      `refreshToken:${sessionId}`,
      JSON.stringify({
        userId: payload.userId,
        device: payload.device || "Unknown",
      }),
      { EX: 7 * 24 * 60 * 60 } // 7 days TTL
    );
    return { refreshToken, sessionId };
  }

  // Verify refresh token and Redis session
  public async verifyRefreshToken(token: string) {
    try {
      const decoded: any = jwt.verify(token, JWT_REFRESH_SECRET as string);
      const data = await redisClient.get(`refreshToken:${decoded.sessionId}`);
      if (!data) return null; // session revoked or expired
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  // Revoke refresh token
  async revokeRefreshToken(sessionId: string) {
    await redisClient.del(`refreshToken:${sessionId}`);
  }

}
