import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password too short")
  .max(64, "Password too long")
  .regex(/[A-Z]/, "Must include uppercase letter")
  .regex(/[a-z]/, "Must include lowercase letter")
  .regex(/[0-9]/, "Must include number")
  .regex(/[^A-Za-z0-9]/, "Must include special character");

// Sign up schema or schema validation
export const signupSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(2, "Full name too short")
      .max(50, "Full name too long"),

    username: z
      .string()
      .trim()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_]+$/, "Invalid username")
      .transform((v) => v.toLowerCase())
      .refine(
        (v) => !["admin", "support", "root"].includes(v),
        "Username not allowed"
      ),

    email: z
      .string()
      .email("Invalid email")
      .transform((v) => v.toLowerCase())
      .optional(),

    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number")
      .optional(),

    password: passwordSchema,

    dateOfBirth: z.coerce.date().refine((date) => {
      const age =
        (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      return age >= 13;
    }, "User must be at least 13 years old"),

    profilePicture: z.string().url().optional().nullable(),

    gender: z
      .number()
      .int()
      .refine((v) => [0, 1, 2].includes(v))
      .default(2),
  })

  .refine((data) => data.email || data.phoneNumber, {
    path: ["email"],
    message: "Either email or phone number is required",
  })

  .strict();

// sign in schema or schema validation
export const signInSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_]+$/, "Invalid username")
      .transform((v) => v.toLowerCase())
      .refine(
        (v) => !["admin", "support", "root"].includes(v),
        "Username not allowed"
      )
      .optional(),

    email: z
      .string()
      .email("Invalid email")
      .transform((v) => v.toLowerCase())
      .optional(),

    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number")
      .optional(),

    password: passwordSchema,
  })
  .refine((data) => data.email || data.username || data.phoneNumber, {
    path: ["email"],
    message: "Either email or username or phone number is required",
  })
  .strict();
