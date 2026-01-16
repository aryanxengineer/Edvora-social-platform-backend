import { z } from "zod";

export const createdPostSchema = z
  .object({
    title: z.string().optional(),
    imageUrl: z.string().url(),
    caption: z.string().max(2200).optional(),
    location: z.string().max(100).optional(),
    tags: z.array(z.string().max(100)).optional(),
    mentions: z.array(z.string().max(100)).optional(),
  })
  .strict();
