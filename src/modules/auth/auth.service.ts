import type { TokenService } from "@/common/auth/token.service.js";

import type { SignInUser, SignUpUser } from "./auth.types.js";
import type { AuthRepository } from "./auth.repository.js";

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(input: SignUpUser, device?: string) {
    const user = await this.authRepository.signUp(input);

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
    });

    const { refreshToken } = await this.tokenService.generateRefreshToken({
      userId: user.id,
    });

    return { user, accessToken, refreshToken };
  }

  async signIn(input: SignInUser, device?: string) {
    const user = await this.authRepository.signIn(input);

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
    });

    const { refreshToken } = await this.tokenService.generateRefreshToken({
      userId: user.id,
    });

    return { user, accessToken, refreshToken };
  }
}
