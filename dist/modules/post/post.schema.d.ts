import { z } from "zod";
export declare const newPostSchema: z.ZodObject<{
    imageUrl: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    caption: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    mentions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    visibility: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type NewPostDataType = z.infer<typeof newPostSchema>;
//# sourceMappingURL=post.schema.d.ts.map