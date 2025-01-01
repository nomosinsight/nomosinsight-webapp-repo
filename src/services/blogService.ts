import { BlogPost, BlogFilters } from '../types/blog';
import { ref, push, set, onValue } from 'firebase/database';
import { db } from '../config/firebase';

// Get all blog posts
export const getBlogPosts = async (filters?: BlogFilters): Promise<BlogPost[]> => {
  return new Promise((resolve, reject) => {
    const blogsRef = ref(db, 'blogs');
    onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        resolve([]);
        return;
      }

      let posts = Object.entries(data).map(([id, post]: [string, any]) => ({
        id,
        ...post
      }));

      if (filters) {
        if (filters.category) {
          posts = posts.filter(post => post.category.slug === filters.category);
        }
        if (filters.tag) {
          posts = posts.filter(post => post.tags.includes(filters.tag!));
        }
        if (filters.author) {
          posts = posts.filter(post => post.author.id === filters.author);
        }
      }

      resolve(posts);
    }, {
      onlyOnce: true
    });
  });
};

// Get a single blog post by slug
export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  return new Promise((resolve, reject) => {
    const blogsRef = ref(db, 'blogs');
    onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        resolve(null);
        return;
      }

      const posts = Object.values(data) as BlogPost[];
      const post = posts.find(p => p.slug === slug);
      resolve(post || null);
    }, {
      onlyOnce: true
    });
  });
};

// Create a new blog post
export const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
  try {
    const blogsRef = ref(db, 'blogs');
    const newPostRef = push(blogsRef);
    const newPost = {
      ...post,
      id: newPostRef.key
    };
    await set(newPostRef, newPost);
    return newPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Failed to create blog post');
  }
};