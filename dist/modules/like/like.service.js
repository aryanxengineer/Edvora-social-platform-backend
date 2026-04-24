import mongoose from "mongoose";
import { BadRequestError } from "@common/errors/badRequest.error.js";
export class LikeService {
    likeRepo;
    postRepo;
    constructor(likeRepo, postRepo) {
        this.likeRepo = likeRepo;
        this.postRepo = postRepo;
    }
    async likes(userId, postId) {
        const post = await this.postRepo.findById(postId);
        if (!post) {
            throw new BadRequestError("Post not found");
        }
        const likes = await this.likeRepo.find(postId);
        return likes;
    }
    async likePost(userId, postId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const alreadyLiked = await this.likeRepo.exists(userId, postId);
            if (alreadyLiked)
                return; // idempotent
            const post = await this.postRepo.findById(postId);
            if (!post) {
                throw new BadRequestError("Post not found");
            }
            await this.likeRepo.createLike(userId, postId, session);
            await this.postRepo.incrementLikeCount(postId, session);
            await session.commitTransaction();
        }
        catch (err) {
            await session.abortTransaction();
            throw err;
        }
        finally {
            session.endSession();
        }
    }
    async unlikePost(userId, postId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const exists = await this.likeRepo.exists(userId, postId);
            if (!exists)
                return; // idempotent
            await this.likeRepo.deleteLike(userId, postId, session);
            await this.postRepo.decrementLikeCount(postId, session);
            await session.commitTransaction();
        }
        catch (err) {
            await session.abortTransaction();
            throw err;
        }
        finally {
            session.endSession();
        }
    }
}
//# sourceMappingURL=like.service.js.map