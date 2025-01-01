import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import BlogForm from './BlogForm';
import { createBlogPost, getBlogPosts } from '../../services/blogService';
import type { BlogPost } from '../../types/blog';

export default function BlogAdmin() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const blogPosts = await getBlogPosts();
      setPosts(blogPosts);
    } catch (err: any) {
      setError(err.message || 'Failed to load blog posts');
    }
  };

  const handleCreate = async (postData: Omit<BlogPost, 'id'>) => {
    try {
      setError('');
      await createBlogPost(postData);
      setIsCreating(false);
      await loadPosts();
    } catch (err: any) {
      setError(err.message || 'Failed to create blog post');
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Blog Posts</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your blog posts here
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
            >
              Add Post
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        {isCreating ? (
          <BlogForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />
        ) : (
          <div className="mt-8 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                          Title
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Category
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Published
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                            {post.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {post.category.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}