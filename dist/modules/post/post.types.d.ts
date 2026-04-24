import { Document, Types } from "mongoose";
export type Visibility = "public" | "private";
export type PostImageType = {
    url: string;
    publicId: string;
};
export interface IPost extends Document {
    _id: Types.ObjectId;
    profileId: Types.ObjectId;
    authorUsernameSnapshot: string;
    authorAvatar: string;
    image: PostImageType;
    likesCount: number;
    caption?: string;
    title?: string;
    hashtags: string[];
    mentions: string[];
    visibility: Visibility;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=post.types.d.ts.map