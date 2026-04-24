import mongoose, { Schema } from "mongoose";
const followSchema = new Schema({
    followerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    followingId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
    },
}, {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
});
// 🚀 Prevent duplicate follows
followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });
// 🚀 Fast follower queries
followSchema.index({ followingId: 1, createdAt: -1 });
export const FollowModel = mongoose.model("Follow", followSchema);
//# sourceMappingURL=follow.model.js.map