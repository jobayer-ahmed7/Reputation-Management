import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(50, { message: 'Name must be at most 50 characters' }),

    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Email is not a valid string' }),

    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(4, { message: 'Password should not be less than 4 characters' })
      .max(20, { message: 'Password should not be more than 20 characters' }),
  }),
});

export const userValidations = {
  userValidationSchema,
};
