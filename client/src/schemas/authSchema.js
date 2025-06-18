import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, "Password must be at least 8 characters"),
});

const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(1, "Name is required"),

    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Invalid email address"),

    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(8, "Password must be at least 8 characters"),

    verifyPassword: z
      .string({
        required_error: "Please confirm your password",
      })
      .trim(),
  })
  .refine((data) => data.password === data.verifyPassword, {
    path: ["verifyPassword"],
    message: "Passwords do not match",
  });

export { loginSchema, registerSchema };
