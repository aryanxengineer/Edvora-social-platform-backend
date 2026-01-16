import { BadRequestError } from "@/common/errors/badRequest.error.js";
import { UserModel } from "../user/user.model.js";

export class PostRepository {
    constructor() {}

    public async saveCreatedPost(data: any): Promise<void> {
        // Logic to save the created post to the database
        const user = await UserModel.findById(data.userId);
        if(!user) {
            throw new BadRequestError('Invalid user ID');
        }

        
    }
}