import { z } from "zod";

export const newPostSchema = z
  .object({
    imageUrl: z.string().url(),
    title: z.string().optional(),
    caption: z.string().max(2200).optional(),
    location: z.string().max(100).optional(),
    tags: z.array(z.string().max(100)).optional(),
    mentions: z.array(z.string().max(100)).optional(),
  })
  .strict();
