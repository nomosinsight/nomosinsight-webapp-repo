import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Clock, Calendar } from 'lucide-react';
import { getAllPosts } from '../../data/posts';
import type { BlogPost } from '../../types/blog';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Link to={`/blog/${post.slug}`}>
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
            />
          </Link>
          
          <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
              </span>
            </div>

            <Link 
              to={`/blog/${post.slug}`}
              className="block group"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
            </Link>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <Link
                to={`/blog/${post.slug}`}
                className="text-primary hover:text-primary-hover font-medium"
              >
                Read More
              </Link>
              <span className="text-sm font-medium text-gray-500">
                {post.category.name}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}