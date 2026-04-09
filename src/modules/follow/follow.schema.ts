import { z } from "zod";

export const followSchema = z.object({
  targetUserId: z.string().min(1),
});

export type FollowInput = z.infer<typeof followSchema>;