import Container from '../components/common/Container';
import Section from '../components/common/Section';
import SectionTitle from '../components/common/SectionTitle';
import IndustriesGrid from '../components/industries/IndustriesGrid';

export default function IndustriesPage() {
  return (
    <Section className="pt-32">
      <Container>
        <SectionTitle
          title="Industries We Serve"
          subtitle="Delivering innovative solutions across diverse sectors"
          centered={false}
        />
        <IndustriesGrid />
      </Container>
    </Section>
  );
}