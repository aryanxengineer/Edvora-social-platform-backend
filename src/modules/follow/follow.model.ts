import { Schema, model } from "mongoose";
import { type IFollow } from "./follow.types.js";

const followSchema: Schema<IFollow> = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  followerCounts: {
    type: Number,
    default: 0,
  },
  followingCounts: {
    type: Number,
    default: 0,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const FollowModel = model<IFollow>("Follow", followSchema);
