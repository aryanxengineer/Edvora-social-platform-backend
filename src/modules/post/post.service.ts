import { deleteAsset, uploadFromBuffer } from "@config/cloudinary.js";
import type { PostRepository } from "./post.repository.js";
import { InternalServerError } from "@common/errors/internal.error.js";
import type { NewPostDataType } from "./post.schema.js";

export class PostService {
  constructor(private postRepository: PostRepository) {}

  public async createPost(
    userId: string,
    data: NewPostDataType,
    file: Express.Multer.File,
  ): Promise<void> {
    // Logic to handle post creation
    const uploadResult = await uploadFromBuffer(file.buffer, {
      resource_type: "image",
    });

    if (!uploadResult) {
      throw new InternalServerError("Failed to upload image");
    }

    await this.postRepository.saveCreatedPost(userId, data, uploadResult);

    return;
  }

  public async getPostById(postId: string) {
    const post = await this.postRepository.getPostById(postId);

    return post;
  }

  public async deletePost(postId: string) {
    await this.postRepository.deletePost(postId);

    return;
  }
}
