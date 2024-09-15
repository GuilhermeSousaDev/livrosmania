import { z } from 'zod';

export const userSchema = z
  .object({
    name: z.string().min(1, 'Name required'),
    email: z.string().min(1, 'Email required'),
    image: z.string().min(1, 'Image required'),
  })
  .strict();
