import mongoose, { Types } from "mongoose";
import { PostVisibility, PostStatus } from "@common/enums/enums.js";
export declare const ReelModel: mongoose.Model<{
    hashtags: string[];
    visibility: PostVisibility;
    authorId: Types.ObjectId;
    status: PostStatus;
    watchTime: number;
    completionRate: number;
    score: number;
    isReported: boolean;
    reportCount: number;
    caption?: string;
    deletedAt?: NativeDate;
    video?: {
        url: string;
        duration: number;
        width?: number;
        height?: number;
        thumbnailUrl?: string;
    };
    engagement?: {
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
        savesCount: number;
    };
    audioId?: Types.ObjectId;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    hashtags: string[];
    visibility: PostVisibility;
    authorId: Types.ObjectId;
    status: PostStatus;
    watchTime: number;
    completionRate: number;
    score: number;
    isReported: boolean;
    reportCount: number;
    caption?: string;
    deletedAt?: NativeDate;
    video?: {
        url: string;
        duration: number;
        width?: number;
        height?: number;
        thumbnailUrl?: string;
    };
    engagement?: {
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
        savesCount: number;
    };
    audioId?: Types.ObjectId;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
    versionKey: false;
}> & Omit<{
    hashtags: string[];
    visibility: PostVisibility;
    authorId: Types.ObjectId;
    status: PostStatus;
    watchTime: number;
    completionRate: number;
    score: number;
    isReported: boolean;
    reportCount: number;
    caption?: string;
    deletedAt?: NativeDate;
    video?: {
        url: string;
        duration: number;
        width?: number;
        height?: number;
        thumbnailUrl?: string;
    };
    engagement?: {
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
        savesCount: number;
    };
    audioId?: Types.ObjectId;
} & mongoose.DefaultTimestampProps & {
    _id: Types.ObjectId;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    hashtags: string[];
    visibility: PostVisibility;
    authorId: Types.ObjectId;
    status: PostStatus;
    watchTime: number;
    completionRate: number;
    score: number;
    isReported: boolean;
    reportCount: number;
    caption?: string;
    deletedAt?: NativeDate;
    video?: {
        url: string;
        duration: number;
        width?: number;
        height?: number;
        thumbnailUrl?: string;
    };
    engagement?: {
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
        savesCount: number;
    };
    audioId?: Types.ObjectId;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    hashtags: string[];
    visibility: PostVisibility;
    authorId: Types.ObjectId;
    status: PostStatus;
    watchTime: number;
    completionRate: number;
    score: number;
    isReported: boolean;
    reportCount: number;
    caption?: string;
    deletedAt?: NativeDate;
    video?: {
        url: string;
        duration: number;
        width?: number;
        height?: number;
        thumbnailUrl?: string;
    };
    engagement?: {
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
        savesCount: number;
    };
    audioId?: Types.ObjectId;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & Omit<{
    hashtags: string[];
    visibility: PostVisibility;
    authorId: Types.ObjectId;
    status: PostStatus;
    watchTime: number;
    completionRate: number;
    score: number;
    isReported: boolean;
    reportCount: number;
    caption?: string;
    deletedAt?: NativeDate;
    video?: {
        url: string;
        duration: number;
        width?: number;
        height?: number;
        thumbnailUrl?: string;
    };
    engagement?: {
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
        savesCount: number;
    };
    audioId?: Types.ObjectId;
} & mongoose.DefaultTimestampProps & {
    _id: Types.ObjectId;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        hashtags: string[];
        visibility: PostVisibility;
        authorId: Types.ObjectId;
        status: PostStatus;
        watchTime: number;
        completionRate: number;
        score: number;
        isReported: boolean;
        reportCount: number;
        caption?: string;
        deletedAt?: NativeDate;
        video?: {
            url: string;
            duration: number;
            width?: number;
            height?: number;
            thumbnailUrl?: string;
        };
        engagement?: {
            likesCount: number;
            commentsCount: number;
            sharesCount: number;
            savesCount: number;
        };
        audioId?: Types.ObjectId;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
        versionKey: false;
    }>> & Omit<{
        hashtags: string[];
        visibility: PostVisibility;
        authorId: Types.ObjectId;
        status: PostStatus;
        watchTime: number;
        completionRate: number;
        score: number;
        isReported: boolean;
        reportCount: number;
        caption?: string;
        deletedAt?: NativeDate;
        video?: {
            url: string;
            duration: number;
            width?: number;
            height?: number;
            thumbnailUrl?: string;
        };
        engagement?: {
            likesCount: number;
            commentsCount: number;
            sharesCount: number;
            savesCount: number;
        };
        audioId?: Types.ObjectId;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    }, "id"> & {
        id: string;
    }>;
}, {
    hashtags: string[];
    visibility: PostVisibility;
    authorId: Types.ObjectId;
    status: PostStatus;
    watchTime: number;
    completionRate: number;
    score: number;
    isReported: boolean;
    reportCount: number;
    caption?: string;
    deletedAt?: NativeDate;
    video?: {
        url: string;
        duration: number;
        width?: number;
        height?: number;
        thumbnailUrl?: string;
    };
    engagement?: {
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
        savesCount: number;
    };
    audioId?: Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>, {
    hashtags: string[];
    visibility: PostVisibility;
    authorId: Types.ObjectId;
    status: PostStatus;
    watchTime: number;
    completionRate: number;
    score: number;
    isReported: boolean;
    reportCount: number;
    caption?: string;
    deletedAt?: NativeDate;
    video?: {
        url: string;
        duration: number;
        width?: number;
        height?: number;
        thumbnailUrl?: string;
    };
    engagement?: {
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
        savesCount: number;
    };
    audioId?: Types.ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=reel.model.d.ts.map