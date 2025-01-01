export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  publishedAt: string;
  readingTime: string;
  category: Category;
  tags: string[];
  coverImage: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
}