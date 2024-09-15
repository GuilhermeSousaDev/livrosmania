import { z } from 'zod';

export const bookSchema = z
  .object({
    title: z.string().min(2, 'Title required'),
    user_email: z.string().min(1, 'User email required'),
    description: z.string().optional(),
    cover: z.string().optional(),
    content: z.any().optional(),
  })
  .strict();

export const updateBookSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    content: z.any().optional(),
  })
  .strict();
