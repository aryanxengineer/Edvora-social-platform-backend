export declare class UserRepository {
    getAllUsers: () => Promise<(import("mongoose").Document<unknown, {}, import("./user.types.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.types.js").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
//# sourceMappingURL=user.repository.d.ts.map