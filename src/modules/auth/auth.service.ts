import type { ISignInUser, ISignUpUser } from "./auth.types.js";
import type { AuthRepository } from "./auth.repository.js";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  // get my details service
  async getMyDetails(userId : string) {
    const user = await this.authRepository.getMyDetails(userId);
    return user;
  }

  // Sign up service
  async signUp(input: ISignUpUser, device?: string) {
    const user = await this.authRepository.signUp(input);

    return { user };
  }

  // Sign in service
  async signIn(input: ISignInUser, device?: string) {
    const user = await this.authRepository.signIn(input);
        console.log(user , ' service mer koi error nhi aayi repo se aane ke baad');


    return { user };
  }

  // Verify Email service
  // async verifyEmail(token: string) {
  //   const user = await this.authRepository.verifyEmail(token);
  //   return { user };
  // }
}
