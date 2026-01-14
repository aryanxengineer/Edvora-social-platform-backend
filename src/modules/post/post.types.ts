interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
}

interface Post {
  id: string;
  user: User;
  type: 'image' | 'video';
  mediaUrl: string;           // Image/video file URL
  caption?: string;           // Optional
  likes: number;
  comments: Comment[];
  isLikedByCurrentUser: boolean;
  isSavedByCurrentUser: boolean;
  createdAt: string;
  location?: string;
  tags?: string[];            // hashtags
  mentions?: string[];        // @usernames
  accessibilityText?: string; // alt text for image/video
}
