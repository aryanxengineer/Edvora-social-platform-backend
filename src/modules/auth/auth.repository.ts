import bcrypt from "bcrypt";

import { UserModel } from "@modules/user/user.model.js";

import { ConflictError } from "@common/errors/conflict.error.js";
import { InternalServerError } from "@common/errors/internal.error.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";
import { compareValue, hashValue } from "@common/utils/bcrypt.js";
import type { SignInDataType } from "./auth.schema.js";

export class AuthRepository {
  // Default constructor
  constructor() {}

  async getMyDetails(userId: string) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new BadRequestError("Resource not found");
    }

    return user;
  }

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

    const hashedPassword = await hashValue(data.password);

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
  async signIn(data: SignInDataType) {
    const query: any = {};

    if (data.email) query.email = data.email;
    else if (data.phoneNumber) query.phoneNumber = data.phoneNumber;
    else if (data.username) query.username = data.username;

    const user = await UserModel.findOne(query).select("+password").lean();

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const isValidPassword = await compareValue(data.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid password");
    }

    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
  }

  // Verify Email Repository
  // async verifyEmail(token: string) {
  //   // Find user with the verification token
  //   const user = await  .findOne({ emailVerificationToken: token });

  //   if (!user) {
  //     throw new UnauthorizedError("Invalid or expired verification token");
  //   }
  //   // Update user's email verification status
  //   user.isEmailVerified = true;
  //   user.emailVerificationToken = undefined; // Clear the token
  //   await user.save();
  //   return {
  //     id: user._id.toString(),
  //     username: user.username,
  //     email: user.email,
  //   };
  // }
}
