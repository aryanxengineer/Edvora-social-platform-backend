import bcrypt from "bcrypt";

import { UserModel } from "@/modules/user/user.model.js";

import { ConflictError } from "@/common/errors/conflict.error.js";
import { InternalServerError } from "@/common/errors/internal.error.js";
import { UnauthorizedError } from "@/common/errors/unauthorized.error.js";

export class AuthRepository {
  // Default constructor
  constructor() {}

  async signUp(data: any) {
    // Check existing user
    const exists = await UserModel.findOne({
      email: data.email,
    }).lean();

    if (exists) {
      if (exists.email === data.email) {
        throw new ConflictError("Email already exists");
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    let user;
    try {
      user = await UserModel.create({
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        phoneNumber: data?.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data?.gender,
        profilePicture: data?.profilePicture,
      });
    } catch (err: any) {
      if (err.code === 11000) {
        throw new ConflictError("User already exists");
      }

      throw new InternalServerError();
    }

    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
  }

  // SignInService
  async signIn(data: any) {
    const exists = await UserModel.findOne({
      $or: [
        { email: data.email },
        { phoneNumber: data.phoneNumber },
        { username: data.username },
      ],
    }).lean();

    if (!exists) {
      if (data.email.trim()) {
        throw new UnauthorizedError("Email not found!");
      } else if (data.phoneNumber.trim())
        throw new UnauthorizedError("Number not found");
      else if (data.username.trim())
        throw new UnauthorizedError("Username not found");
      else throw new UnauthorizedError();
    }

    let isValidPassword = false;

    if (data.password.trim()) {
      isValidPassword = await bcrypt.compare(data.password, exists.password);
    }

    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid password");
    }

    return {
      id: exists._id.toString(),
      username: exists.username,
      email: exists.email,
    };
  }

  // Verify Email Repository
  async verifyEmail(token: string) {
    // Find user with the verification token
    const user = await  .findOne({ emailVerificationToken: token });

    if (!user) {
      throw new UnauthorizedError("Invalid or expired verification token");
    }
    // Update user's email verification status
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined; // Clear the token
    await user.save();
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
  }
}
