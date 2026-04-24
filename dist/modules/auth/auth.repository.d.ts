export declare class AuthRepository {
    findUserByIdentifier(query: any): Promise<import("../user/user.types.js").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findUserByEmail(email: string): Promise<import("../user/user.types.js").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    createUser(data: any): Promise<import("mongoose").Document<unknown, {}, import("../user/user.types.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../user/user.types.js").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getUserById(userId: string): Promise<import("../user/user.types.js").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=auth.repository.d.ts.map