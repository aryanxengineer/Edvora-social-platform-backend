import { ProfileRepository } from "./profile.repository.js";
export declare class ProfileService {
    private repo;
    constructor(repo: ProfileRepository);
    getMyProfile(userId: string): Promise<import("./profile.types.js").IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    createProfile(data: any): Promise<import("mongoose").Document<unknown, {}, import("./profile.types.js").IProfile, {}, import("mongoose").DefaultSchemaOptions> & import("./profile.types.js").IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getOtherProfile(profileId: string): Promise<import("mongoose").Document<unknown, {}, import("./profile.types.js").IProfile, {}, import("mongoose").DefaultSchemaOptions> & import("./profile.types.js").IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    newAvatar(userId: string, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("./profile.types.js").IProfile, {}, import("mongoose").DefaultSchemaOptions> & import("./profile.types.js").IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
//# sourceMappingURL=profile.service.d.ts.map