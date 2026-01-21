import type { SignInUser, SignUpUser } from "./auth.types.js";
import type { AuthRepository } from "./auth.repository.js";

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  // Sign up service
  async signUp(input: SignUpUser, device?: string) {
    const user = await this.authRepository.signUp(input);

    return { user };
  }

  // Sign in service
  async signIn(input: SignInUser, device?: string) {
    const user = await this.authRepository.signIn(input);

    return { user };
  }
}
