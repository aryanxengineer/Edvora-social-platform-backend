import type { AuthRepository } from "./auth.repository.js";
import type { SigninInputType, SignupInputType } from "./auth.schema.js";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  // get my details service
  async getMyDetails(userId : string) {
    const user = await this.authRepository.getMyDetails(userId);
    return user;
  }

  // Sign up service
  async signUp(input: SignupInputType, device?: string) {
    const user = await this.authRepository.signUp(input);

    return { user };
  }

  // Sign in service
  async signIn(input: SigninInputType, device?: string) {
    const user = await this.authRepository.signIn(input);

    return { user };
  }

  // Verify Email service
  // async verifyEmail(token: string) {
  //   const user = await this.authRepository.verifyEmail(token);
  //   return { user };
  // }
}
