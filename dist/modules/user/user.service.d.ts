import type { UserRepository } from "./user.repository.js";
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getAllUsers: () => Promise<(import("mongoose").Document<unknown, {}, import("./user.types.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.types.js").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
//# sourceMappingURL=user.service.d.ts.map