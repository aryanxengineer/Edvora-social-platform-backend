import jwt, { type SignOptions } from "jsonwebtoken";
import { authConfig } from "@config/authConfig.js";
import { type AuthJwtPayload } from "types/auth.types.js";

class JwtService {
  private accessOptions: SignOptions = {
    expiresIn: Number(authConfig.jwt.accessExpiresIn),
  };

  private refreshOptions: SignOptions = {
    expiresIn: Number(authConfig.jwt.refreshExpiresIn),
  };

  signAccessToken(payload: AuthJwtPayload): string {
    return jwt.sign(payload, authConfig.jwt.accessSecret, this.accessOptions);
  }

  signRefreshToken(payload: AuthJwtPayload): string {
    return jwt.sign(payload, authConfig.jwt.refreshSecret, this.refreshOptions);
  }

  verifyAccessToken(token: string): AuthJwtPayload {
    return jwt.verify(token, authConfig.jwt.accessSecret) as AuthJwtPayload;
  }

  verifyRefreshToken(token: string): AuthJwtPayload {
    return jwt.verify(token, authConfig.jwt.refreshSecret) as AuthJwtPayload;
  }
}

export const jwtService = new JwtService();
