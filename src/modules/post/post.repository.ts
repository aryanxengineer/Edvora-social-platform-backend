import mongoose from "mongoose";
import { PostModel } from "./post.model.js";

export class PostRepository {
  async createPost(data: any, session?: mongoose.ClientSession) {
    return PostModel.create([data]).then((res) => res[0]);
  }

  async findById(postId: string) {
    return PostModel.findById(postId).lean();
  }

  async deleteById(postId: string, session?: mongoose.ClientSession) {
    return PostModel.deleteOne({ _id: postId });
  }
}
