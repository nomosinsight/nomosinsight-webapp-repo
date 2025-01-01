import Container from './common/Container';
import Section from './common/Section';
import SectionTitle from './common/SectionTitle';
import IndustriesGrid from './industries/IndustriesGrid';

export default function IndustriesSection() {
  return (
    <Section id="industries" background="light">
      <Container>
        <SectionTitle
          title="Industries We Serve"
          subtitle="Our expertise spans across various sectors, delivering tailored solutions for each industry's unique challenges."
        />
        <IndustriesGrid />
      </Container>
    </Section>
  );
}