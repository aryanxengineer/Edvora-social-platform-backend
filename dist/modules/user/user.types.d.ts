import type { Document } from "mongoose";
export interface IUser extends Document {
    fullname: string;
    username: string;
    email?: string;
    phoneNumber?: string;
    password: string;
    dateOfBirth: Date;
    gender?: number;
    isVerified?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=user.types.d.ts.map