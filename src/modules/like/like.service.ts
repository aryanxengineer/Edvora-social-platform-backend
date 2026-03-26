import { logger } from "@logger/index.js";
import type { LikeRepository } from "./like.repository.js";
import { InternalServerError } from "@common/errors/internal.error.js";

export class LikeService {
  constructor(private likeRepository: LikeRepository) {}

  public likePost = async (userId: string, postId: string) => {
    try {
      await this.likeRepository.likePost(userId, postId);
      return;
    } catch (error) {
        logger.error(error);
        throw new InternalServerError();
    }
  };

  public unlikePost = async (userId: string, postId: string) => {
    try {
      await this.likeRepository.unlikePost(userId, postId);
      return;
    } catch (error) {
        logger.error(error);
        throw new InternalServerError();
    }
  };

}
