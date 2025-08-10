import { z } from 'zod';

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['ADMIN', 'USER']).optional().default('USER'),
  }),
});
