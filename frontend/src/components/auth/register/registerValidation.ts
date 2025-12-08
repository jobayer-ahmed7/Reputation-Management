import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be between 2 and 50 characters")
      .max(50, "Name must be between 2 and 50 characters"),

    email: z
      .string()
      .email("Invalid email address"),

    password: z 
      .string()
      .min(4, "Password must be at least 4 characters"),

    passwordConfirm: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
