import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Technologies from '../components/Technologies';
import IndustriesSection from '../components/Industries';
import Achievements from '../components/Achievements';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Meta from '../components/seo/Meta';
import SchemaMarkup from '../components/seo/SchemaMarkup';

export default function Home() {
  return (
    <>
      <Meta
        title="Custom Software Development & AI Solutions"
        description="Transform your business with custom software development, AI integration, and cloud solutions. Expert team delivering innovative IT solutions for enterprises."
        keywords={[
          'custom software development',
          'AI solutions',
          'enterprise software',
          'cloud computing',
          'digital transformation',
          'IT consulting',
          'software development company',
          'AI integration'
        ]}
      />
      <SchemaMarkup />
      <main>
        <Hero />
        <Projects />
        <Achievements />
        <Services />
        <Technologies />
        <IndustriesSection />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}