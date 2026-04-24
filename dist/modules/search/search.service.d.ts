import { ProfileRepository } from "@modules/profile/profile.repository.js";
export declare class SearchService {
    private profileRepo;
    constructor(profileRepo: ProfileRepository);
    searchQuery: (userId: string, search: string) => Promise<(import("mongoose").Document<unknown, {}, import("../profile/profile.types.js").IProfile, {}, import("mongoose").DefaultSchemaOptions> & import("../profile/profile.types.js").IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
//# sourceMappingURL=search.service.d.ts.map