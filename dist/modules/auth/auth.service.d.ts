import { AuthRepository } from "./auth.repository.js";
import { SigninInputType, SignupInputType } from "./auth.schema.js";
import { ProfileService } from "@modules/profile/profile.service.js";
export declare class AuthService {
    private readonly authRepo;
    private profileService;
    constructor(authRepo: AuthRepository, profileService: ProfileService);
    register(data: SignupInputType): Promise<{
        id: string;
        email: string;
    }>;
    login(input: SigninInputType): Promise<{
        id: string;
        email: string;
    }>;
    getUser(userId: string): Promise<import("../user/user.types.js").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map