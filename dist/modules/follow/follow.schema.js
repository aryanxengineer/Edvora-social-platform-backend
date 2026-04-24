import { z } from "zod";
export const followSchema = z.object({
    targetUserId: z.string().min(1),
});
//# sourceMappingURL=follow.schema.js.map