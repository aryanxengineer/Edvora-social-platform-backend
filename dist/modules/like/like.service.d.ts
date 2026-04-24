import { LikeRepository } from "./like.repository.js";
import { PostRepository } from "@modules/post/post.repository.js";
export declare class LikeService {
    private likeRepo;
    private postRepo;
    constructor(likeRepo: LikeRepository, postRepo: PostRepository);
    likes(userId: string, postId: string): Promise<[] | import("./like.types.js").ILike[]>;
    likePost(userId: string, postId: string): Promise<void>;
    unlikePost(userId: string, postId: string): Promise<void>;
}
//# sourceMappingURL=like.service.d.ts.map