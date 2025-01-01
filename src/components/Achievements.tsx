import { companyInfo } from '../constants/content';
import Container from './common/Container';
import Section from './common/Section';

export default function Achievements() {
  const { stats } = companyInfo;
  
  return (
    <Section background="accent" className="py-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{stats.clientSatisfaction}</div>
            <div className="text-gray-700">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{stats.experience}</div>
            <div className="text-gray-700">Team Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{stats.teamSize}</div>
            <div className="text-gray-700">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{stats.projectsCompleted}</div>
            <div className="text-gray-700">Projects Completed</div>
          </div>
        </div>
      </Container>
    </Section>
  );
}