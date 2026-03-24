import type mongoose from "mongoose";

export interface IFollow {
    profileId: mongoose.Types.ObjectId;
    followerCounts: number;
    followingCounts: number;
    followers: mongoose.Types.ObjectId[] | [];
    following: mongoose.Types.ObjectId[] | [];
}