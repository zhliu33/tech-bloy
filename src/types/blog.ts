export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string | Date | number;
  author: string;
  tags: string[];
  category: string;
  coverImage?: string;
  readingTime: number;
}

export interface PostMeta {
  title: string;
  date: string | Date | number;
  author: string;
  tags: string[];
  category: string;
  excerpt?: string;
  coverImage?: string;
}

export interface CommentConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
}

export interface ThemeConfig {
  name: string;
  logo?: string;
  description: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
    social?: {
      github?: string;
      twitter?: string;
      email?: string;
    };
  };
  navigation: {
    label: string;
    path: string;
  }[];
  giscus: CommentConfig;
}
