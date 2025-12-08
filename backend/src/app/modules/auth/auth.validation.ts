import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string()
      .min(1, { message: "Please provide an email address" })
      .email({ message: "Invalid email address" }),

    password: z.string()
      .min(1, { message: "Please provide a password" })
      .min(4, { message: "Password must be at least 4 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),
  }),
}); 

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string()
      .min(1, { message: "Please provide a refresh token" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(1, { message: "Old password is required" }),
    newPassword: z.string().min(1, { message: "Password is required" }),
  }),
});

export const authValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  changePasswordValidationSchema,
};
