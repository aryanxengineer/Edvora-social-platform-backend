import mongoose from "mongoose";
export declare class ProfileRepository {
    findById(profileId: string): Promise<mongoose.Document<unknown, {}, import("./profile.types.js").IProfile, {}, mongoose.DefaultSchemaOptions> & import("./profile.types.js").IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByUserId(userId: string): Promise<import("./profile.types.js").IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    create(data: any): Promise<mongoose.Document<unknown, {}, import("./profile.types.js").IProfile, {}, mongoose.DefaultSchemaOptions> & import("./profile.types.js").IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    incrementPostCount(profileId: string): Promise<mongoose.UpdateWriteOpResult>;
    decrementPostCount(profileId: string): Promise<mongoose.UpdateWriteOpResult>;
    incrementFollowersCount(userId: string, session?: mongoose.ClientSession): Promise<mongoose.UpdateWriteOpResult>;
    decrementFollowersCount(userId: string, session?: mongoose.ClientSession): Promise<mongoose.UpdateWriteOpResult>;
    incrementFollowingCount(userId: string, session?: mongoose.ClientSession): Promise<mongoose.UpdateWriteOpResult>;
    decrementFollowingCount(userId: string, session?: mongoose.ClientSession): Promise<mongoose.UpdateWriteOpResult>;
    searchQuery(search: string): Promise<(mongoose.Document<unknown, {}, import("./profile.types.js").IProfile, {}, mongoose.DefaultSchemaOptions> & import("./profile.types.js").IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
//# sourceMappingURL=profile.repository.d.ts.map