import { z } from "zod";
export declare const followSchema: z.ZodObject<{
    targetUserId: z.ZodString;
}, z.core.$strip>;
export type FollowInput = z.infer<typeof followSchema>;
//# sourceMappingURL=follow.schema.d.ts.map