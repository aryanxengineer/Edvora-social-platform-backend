import type { TokenService } from "@/common/auth/token.service.js";
import type { AuthService } from "./auth.service.js";
import type { SignInUser, SignUpUser } from "./auth.types.js";
import { logger } from "@/logger/index.js";

export class AuthApplicationService {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  async signUp(input: SignUpUser, device?: string) {
    const user = await this.authService.signUp(input);

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
    });

    const { refreshToken, sessionId } =
      await this.tokenService.generateRefreshToken({
        userId: user.id,
        device: device as string,
      });

    return { user, accessToken, refreshToken, sessionId };
  }

  async signIn(input: SignInUser, device?: string) {
    const user = await this.authService.signIn(input);

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
    });

    const { refreshToken, sessionId } =
      await this.tokenService.generateRefreshToken({
        userId: user.id,
        device: device as string,
      });

      logger.info(`User ${user.id} signed in from device: ${device}`);

    return { user, accessToken, refreshToken, sessionId };
  }

  async signOut(sessionId: string) {
    await this.tokenService.revokeRefreshToken(sessionId);
  }
}
