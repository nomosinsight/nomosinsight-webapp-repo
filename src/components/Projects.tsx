import Container from './common/Container';
import Section from './common/Section';
import SectionTitle from './common/SectionTitle';
import ProjectList from './projects/ProjectList';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <Section background="light">
      <Container>
        <SectionTitle
          title="Featured Projects"
          subtitle="Discover how we've helped businesses transform their digital presence"
        />
        
        <ProjectList projects={projects} />
      </Container>
    </Section>
  );
}