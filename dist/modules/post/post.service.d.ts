import mongoose from "mongoose";
import { PostRepository } from "./post.repository.js";
import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { NewPostDataType } from "./post.schema.js";
import { LikeRepository } from "@modules/like/like.repository.js";
import { CommentRepository } from "@modules/comment/comment.repository.js";
export declare class PostService {
    private likeRepo;
    private commentRepo;
    private postRepo;
    private profileRepo;
    constructor(likeRepo: LikeRepository, commentRepo: CommentRepository, postRepo: PostRepository, profileRepo: ProfileRepository);
    createPost(userId: string, data: NewPostDataType, file: Express.Multer.File): Promise<mongoose.Document<unknown, {}, import("./post.types.js").IPost, {}, mongoose.DefaultSchemaOptions> & import("./post.types.js").IPost & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getPostById(userId: string, postId: string): Promise<{
        isLiked: boolean;
        commentsCount: number;
        _id: mongoose.Types.ObjectId;
        profileId: mongoose.Types.ObjectId;
        authorUsernameSnapshot: string;
        authorAvatar: string;
        image: import("./post.types.js").PostImageType;
        likesCount: number;
        caption?: string;
        title?: string;
        hashtags: string[];
        mentions: string[];
        visibility: import("./post.types.js").Visibility;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: mongoose.Collection;
        db: mongoose.Connection;
        errors?: mongoose.Error.ValidationError;
        isNew: boolean;
        schema: mongoose.Schema;
        __v: number;
    }>;
    getProfilePosts(profileId: string): Promise<(import("./post.types.js").IPost & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    deletePost(postId: string): Promise<void>;
}
//# sourceMappingURL=post.service.d.ts.map