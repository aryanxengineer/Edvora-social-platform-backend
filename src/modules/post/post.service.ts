import { uploadFromBuffer } from "@config/cloudinary.js";
import type { PostRepository } from "./post.repository.js";
import type { RequestedPostData } from "./post.types.js";

export class PostService {
  constructor(private postRepository: PostRepository) {}

  public async createPost(
    userId : string,
    data: RequestedPostData,
    file: Express.Multer.File,
  ): Promise<void> {

    // Logic to handle post creation
    const uploadResult = await uploadFromBuffer(file.buffer, {
      resource_type: "image",
    });

    await this.postRepository.saveCreatedPost(userId, data, uploadResult);

    return;
  }
}
