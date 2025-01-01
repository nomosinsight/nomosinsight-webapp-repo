import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../../types/blog';

interface BlogMetaProps {
  post?: BlogPost;
  isList?: boolean;
}

export default function BlogMeta({ post, isList = false }: BlogMetaProps) {
  const baseUrl = 'https://nomosinsight.com';
  
  if (isList) {
    return (
      <Helmet>
        <title>Blog | Nomos Insights</title>
        <meta 
          name="description" 
          content="Stay updated with the latest insights on software development, AI, cloud computing, and digital transformation from Nomos Insights' expert team."
        />
        <meta 
          name="keywords" 
          content="software development blog, AI insights, cloud computing articles, digital transformation blog, tech insights"
        />
        <link rel="canonical" href={`${baseUrl}/blog`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog | Nomos Insights" />
        <meta 
          property="og:description" 
          content="Stay updated with the latest insights on software development, AI, cloud computing, and digital transformation."
        />
        <meta property="og:url" content={`${baseUrl}/blog`} />
        <meta property="og:type" content="website" />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Nomos Insights Blog',
            description: 'Expert insights on software development, AI, and digital transformation',
            url: `${baseUrl}/blog`,
            publisher: {
              '@type': 'Organization',
              name: 'Nomos Insights',
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`
              }
            }
          })}
        </script>
      </Helmet>
    );
  }

  if (!post) return null;

  return (
    <Helmet>
      <title>{post.title} | Nomos Insights Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta name="keywords" content={post.tags.join(', ')} />
      <link rel="canonical" href={`${baseUrl}/blog/${post.slug}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.coverImage} />
      <meta property="og:url" content={`${baseUrl}/blog/${post.slug}`} />
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={post.publishedAt} />
      <meta property="article:author" content={post.author.name} />
      {post.tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage,
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.author.name,
            jobTitle: post.author.role
          },
          publisher: {
            '@type': 'Organization',
            name: 'Nomos Insights',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${post.slug}`
          },
          keywords: post.tags.join(', ')
        })}
      </script>
    </Helmet>
  );
}