import Container from './common/Container';
import Section from './common/Section';
import SectionTitle from './common/SectionTitle';
import ScrollReveal from './common/ScrollReveal';
import ServiceList from './services/ServiceList';

export default function Services() {
  return (
    <Section id="services" background="light">
      <Container>
        <ScrollReveal>
          <SectionTitle
            title="Services We Offer"
            subtitle="Enhance Customer Experience, Enhance Returns with our comprehensive range of IT solutions"
            centered={false}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <ServiceList />
        </ScrollReveal>
      </Container>
    </Section>
  );
}