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

interface Reel {
  id: string;
  user: User;
  videoUrl: string;
  thumbnailUrl: string;
  caption?: string;
  likes: number;
  comments: Comment[];
  views: number; // Reel-specific
  isLikedByCurrentUser: boolean;
  createdAt: string;
  audio?: {
    id: string;
    title: string;
    artist?: string;
    audioUrl: string;
  };
  effects?: string[]; // applied effects
  tags?: string[];
  mentions?: string[];
  accessibilityText?: string;
}
