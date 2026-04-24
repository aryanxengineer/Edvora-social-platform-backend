import { PostRepository } from "@modules/post/post.repository.js";
import { FollowRepository } from "@modules/follow/follow.repository.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { IPost } from "@modules/post/post.types.js";
import { LikeRepository } from "@modules/like/like.repository.js";
import { CommentRepository } from "@modules/comment/comment.repository.js";
export declare class FeedService {
    private postRepository;
    private followRepository;
    private profileRepository;
    private likeRepository;
    private commentRepository;
    constructor(postRepository: PostRepository, followRepository: FollowRepository, profileRepository: ProfileRepository, likeRepository: LikeRepository, commentRepository: CommentRepository);
    trending: (userId: string) => Promise<{
        isLiked: boolean;
        commentsCount: any;
        _id: import("mongoose").Types.ObjectId;
        profileId: import("mongoose").Types.ObjectId;
        authorUsernameSnapshot: string;
        authorAvatar: string;
        image: import("@modules/post/post.types.js").PostImageType;
        likesCount: number;
        caption?: string;
        title?: string;
        hashtags: string[];
        mentions: string[];
        visibility: import("@modules/post/post.types.js").Visibility;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema;
    }[]>;
    followingPosts: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, IPost, {}, import("mongoose").DefaultSchemaOptions> & IPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
//# sourceMappingURL=feed.service.d.ts.map