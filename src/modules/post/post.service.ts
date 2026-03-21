import { uploadFromBuffer } from "@config/cloudinary.js";
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

    console.log(
      "This is data from service layer ",
      userId,
      " and ",
      data,
      " and ",
      uploadResult,
    );

    await this.postRepository.saveCreatedPost(userId, data, uploadResult);

    console.log("service after repo");

    return;
  }
}
