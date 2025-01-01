import { Helmet } from 'react-helmet-async';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export default function Meta({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage
}: MetaProps) {
  const baseUrl = 'https://nomosinsight.com';
  const defaultTitle = 'Nomos Insights | Custom Software Development & AI Solutions';
  const defaultDescription = 'Transform your business with custom software development, AI integration, and cloud solutions. Expert team delivering innovative IT solutions for enterprises.';
  const defaultKeywords = ['custom software development', 'AI solutions', 'cloud computing', 'enterprise software', 'digital transformation', 'IT consulting'];
  
  const finalTitle = title ? `${title} | Nomos Insights` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const finalOgImage = ogImage || `${baseUrl}/og-image.jpg`;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
    </Helmet>
  );
}