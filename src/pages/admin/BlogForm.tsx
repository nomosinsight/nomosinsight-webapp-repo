import { useState } from 'react';
import type { BlogPost } from '../../types/blog';

interface BlogFormProps {
  post?: BlogPost;
  onSubmit: (post: Omit<BlogPost, 'id'>) => void;
  onCancel: () => void;
}

export default function BlogForm({ post, onSubmit, onCancel }: BlogFormProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [coverImage, setCoverImage] = useState(post?.coverImage || '');
  const [category, setCategory] = useState(post?.category.name || '');
  const [tags, setTags] = useState(post?.tags.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: Omit<BlogPost, 'id'> = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content,
      excerpt,
      coverImage,
      publishedAt: new Date().toISOString(),
      author: {
        id: '1',
        name: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        role: 'Administrator'
      },
      category: {
        id: '1',
        name: category,
        slug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      },
      tags: tags.split(',').map(tag => tag.trim()),
      readingTime: `${Math.ceil(content.split(' ').length / 200)} min read`
    };

    onSubmit(newPost);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto mt-8">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary font-mono"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
        <input
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-primary border border-transparent rounded-md hover:bg-primary-hover"
        >
          {post ? 'Update' : 'Create'} Post
        </button>
      </div>
    </form>
  );
}