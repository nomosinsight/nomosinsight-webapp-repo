import { Outlet } from 'react-router-dom';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import SectionTitle from '../components/common/SectionTitle';
import BlogMeta from '../components/seo/BlogMeta';

export default function Blog() {
  return (
    <Section className="pt-32">
      <BlogMeta isList />
      <Container>
        <SectionTitle
          title="Our Blog"
          subtitle="Insights and updates from our team"
          centered={false}
        />
        <Outlet />
      </Container>
    </Section>
  );
}