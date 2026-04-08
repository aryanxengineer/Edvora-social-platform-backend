import { ConflictError } from "@common/errors/conflict.error.js";
import { AuthRepository } from "./auth.repository.js";
import { SigninInputType, SignupInputType } from "./auth.schema.js";
import { compareValue, hashValue } from "@common/utils/bcrypt.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";
import { ProfileService } from "@modules/profile/profile.service.js";

export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private profileService: ProfileService,
  ) {}

  async register(data: SignupInputType) {
    if (!data.email) {
      throw new BadRequestError();
    }

    const exists = await this.authRepo.findUserByEmail(data.email);

    if (exists) {
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await hashValue(data.password);

    const user = await this.authRepo.createUser({
      ...data,
      password: hashedPassword,
    });

    // ✅ Delegate profile creation
    await this.profileService.createProfile({
      userId: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    });

    return {
      id: user._id.toString(),
      email: user.email,
    };
  }

  async login(input: SigninInputType) {
    const query: any = {};

    if (input.type === "email") query.email = input.identifier;
    if (input.type === "phone") query.phoneNumber = input.identifier;
    if (input.type === "username") query.username = input.identifier;

    const user = await this.authRepo.findUserByIdentifier(query);

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const isValid = await compareValue(input.password, user.password);

    if (!isValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    return {
      id: user._id.toString(),
      email: user.email,
    };
  }

  async getUser(userId: string) {
    const user = await this.authRepo.getUserById(userId);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    return user;
  }
}
