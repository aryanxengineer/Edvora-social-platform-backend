import { AuthService } from "./auth.service.js";
import { TokenService } from "@/common/auth/token.service.js";
import type { SignInUser, SignUpUser } from "./auth.types.js";

export class AuthApplicationService {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  async signUp(input: SignUpUser) {
    const user = await this.authService.signUp(input);

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      userId: user.id,
      tokenVersion: 1,
    });

    return { user, accessToken, refreshToken };
  }

  async signIn(input: SignInUser) {
    const user = await this.authService.signIn(input);

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      userId: user.id,
      tokenVersion: 1,
    });

    return { user, accessToken, refreshToken };
  }
}
