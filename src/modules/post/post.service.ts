import type { PostRepository } from "./post.repository.js";
import type { RequestedPostData } from "./post.types.js";

export class PostService {
    constructor(private postRepository: PostRepository) {}

    public async createPost(data: RequestedPostData): Promise<void> {
        // Business logic to create a post
        const postData = await this.postRepository.saveCreatedPost(data);
    }
}