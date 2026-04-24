import { Schema, model } from "mongoose";
const profileSchema = new Schema({
    fullname: { type: String, required: true, trim: true, minlength: 2 },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true, // important for optional unique field
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true, // 1:1 relation enforced
        index: true,
    },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    postCounts: { type: Number, default: 0 },
    reelCounts: { type: Number, default: 0 },
    savedPostCounts: { type: Number, default: 0 },
    dateOfBirth: { type: Date },
    avatar: { type: String, default: null },
    bio: { type: String, maxlength: 150 },
    gender: { type: Number, enum: [0, 1, 2], default: 2 },
    accountVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const ProfileModel = model("Profile", profileSchema);
//# sourceMappingURL=profile.model.js.map