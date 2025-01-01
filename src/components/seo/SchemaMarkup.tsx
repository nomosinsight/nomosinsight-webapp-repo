import { Helmet } from 'react-helmet-async';

export default function SchemaMarkup() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nomos Insights',
    url: 'https://nomosinsight.com',
    logo: 'https://nomosinsight.com/logo.png',
    description: 'Custom software development and AI solutions provider specializing in enterprise digital transformation.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1001-02, Sarthana Business Hub, Sarthana Jakat Naka',
      addressLocality: 'Surat',
      addressRegion: 'Gujarat',
      postalCode: '395006',
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91 7202030030',
      contactType: 'customer service',
      email: 'info.nomosinsight@gmail.com'
    },
    sameAs: [
      'https://www.linkedin.com/company/nomos-insights',
      'https://github.com/nomosinsight'
    ]
  };

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'Organization',
      name: 'Nomos Insights'
    },
    serviceType: [
      'Custom Software Development',
      'AI & Machine Learning Solutions',
      'Cloud Computing Services',
      'Enterprise Software Solutions'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Global'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(servicesSchema)}
      </script>
    </Helmet>
  );
}