import { format } from 'date-fns';
import { Clock, User } from 'lucide-react';
import { BlogPost } from '../../types/blog';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/blog/${post.slug}`} className="block">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="inline-flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.readingTime}
          </span>
          <span className="inline-flex items-center">
            <User className="w-4 h-4 mr-1" />
            {post.author.name}
          </span>
        </div>
        
        <Link to={`/blog/${post.slug}`} className="block group">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">
            {post.category.name}
          </span>
          <time className="text-sm text-gray-500">
            {format(new Date(post.publishedAt), 'MMM d, yyyy')}
          </time>
        </div>
      </div>
    </article>
  );
}