import type { PostRepository } from "./post.repository.js";

export class PostService {
    constructor(private postRepository: PostRepository) {}

    public async createPost(data: any): Promise<void> {
        // Business logic to create a post
        const postData = await this.postRepository.saveCreatedPost(data);
    }
}