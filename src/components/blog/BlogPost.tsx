import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../../data/posts';
import BlogMeta from '../seo/BlogMeta';
import type { BlogPost as BlogPostType } from '../../types/blog';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      setPost(foundPost);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Post not found</h2>
        <Link 
          to="/blog" 
          className="text-primary hover:text-primary-hover inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <BlogMeta post={post} />
      <Link 
        to="/blog" 
        className="inline-flex items-center text-gray-600 hover:text-primary mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-lg mb-8"
      />

      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 not-prose">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            {post.readingTime}
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
          </div>
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            {post.author.name}
          </div>
        </div>

        <div className="mb-8 not-prose">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ReactMarkdown className="prose prose-lg prose-headings:text-gray-900 prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-hover">
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}