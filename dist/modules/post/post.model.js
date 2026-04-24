import mongoose, { Schema } from "mongoose";
const PostSchema = new Schema({
    profileId: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    authorUsernameSnapshot: {
        type: String,
        required: true,
    },
    authorAvatar: {
        type: String,
    },
    image: {
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        },
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    caption: {
        type: String,
        maxlength: 2200,
        trim: true,
    },
    title: {
        type: String,
        maxlength: 200,
        trim: true,
    },
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
    hashtags: [{ type: String }],
    mentions: {
        type: [String],
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
});
PostSchema.index({ authorId: 1, createdAt: -1 });
PostSchema.index({ hashtags: 1, createdAt: -1 });
export const PostModel = mongoose.model("Post", PostSchema);
//# sourceMappingURL=post.model.js.map