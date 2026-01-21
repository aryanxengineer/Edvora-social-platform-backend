import { BadRequestError } from "@/common/errors/badRequest.error.js";
import { UserModel } from "../user/user.model.js";
import type { RequestedPostData } from "./post.types.js";

export class PostRepository {
    constructor() {}

    public async saveCreatedPost(data: RequestedPostData): Promise<void> {
        // Logic to save the created post to the database
        const user = await UserModel.findById(data.authorId);
        if(!user) {
            throw new BadRequestError('Invalid user ID');
        }

        
    }
}