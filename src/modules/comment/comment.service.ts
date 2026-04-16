import { ProfileRepository } from "@modules/profile/profile.repository.js";
import { CommentRepository } from "./comment.repository.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";
import { PostRepository } from "@modules/post/post.repository.js";
import { InternalServerError } from "@common/errors/internal.error.js";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { NotFoundError } from "@common/errors/notFound.error.js";

export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private profileRepository: ProfileRepository,
    private postRepository: PostRepository,
  ) {}

  public getComments = async (
    postId: string,
  ) => {

    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new BadRequestError("Post not found");
    }

    const comment = await this.commentRepository.getComments(
      postId
    );

    if (!comment) {
      throw new BadRequestError();
    }

    return comment;
  };

  public addComment = async (
    postId: string,
    content: string,
    userId: string,
  ) => {
    const userprofile = await this.profileRepository.findByUserId(userId);
    if (!userprofile) {
      throw new UnauthorizedError("User profile not found");
    }

    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new BadRequestError("Post not found");
    }

    const comment = await this.commentRepository.create(
      postId,
      content,
      userId,
    );
    if (!comment) {
      throw new InternalServerError();
    }

    return comment;
  };

  public deleteComent = async (commentId: string, userId: string) => {
    const userprofile = await this.profileRepository.findByUserId(userId);
    if (!userprofile) {
      throw new UnauthorizedError("User profile not found");
    }

    const comment = await this.commentRepository.deleteById(
     commentId
    );

    if (!comment) {
      throw new BadRequestError("Comment does not exists");
    }

    return;
  };
}
