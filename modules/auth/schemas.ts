import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email("Email invalid"),
  password: z.string(),
  username: z
    .string()
    .min(0, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .refine((val) => !val.includes("--"), "Username cannot contain '--'")
    .transform((val) => val.toLowerCase()),
});
