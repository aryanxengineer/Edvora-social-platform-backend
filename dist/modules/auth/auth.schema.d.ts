import { z } from "zod";
export declare const signupUserSchema: z.ZodObject<{
    fullname: z.ZodString;
    username: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    email: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    dateOfBirth: z.ZodCoercedDate<unknown>;
    gender: z.ZodDefault<z.ZodNumber>;
}, z.core.$strict>;
export declare const signinUserSchema: z.ZodPipe<z.ZodObject<{
    identifier: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>, z.ZodTransform<{
    type: string;
    identifier: string;
    password: string;
}, {
    identifier: string;
    password: string;
}>>;
export type SigninInputType = z.infer<typeof signinUserSchema>;
export type SignupInputType = z.infer<typeof signupUserSchema>;
//# sourceMappingURL=auth.schema.d.ts.map