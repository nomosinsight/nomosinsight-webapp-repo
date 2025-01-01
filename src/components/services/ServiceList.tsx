import { useState } from 'react';
import { Code, Globe, Smartphone, Wrench, Brain, Cloud, Workflow, Users } from 'lucide-react';
import ServiceItem from './ServiceItem';
import ServiceDetails from './ServiceDetails';
import CardReveal from '../common/CardReveal';
import type { Service } from '../../types/service';

const services: Service[] = [
  {
    id: 'ai-ml',
    title: 'LLM, AI Chatbot & Machine Learning',
    icon: Brain,
    description: 'Intelligent solutions powered by AI and ML',
    features: [
      'Integration of Large Language Models (LLMs) for conversational AI',
      'Retrieval-Augmented Generation (RAG) systems for enhanced knowledge access',
      'Personalized recommendation engines for enhanced user experiences',
      'Advanced Natural Language Processing for understanding text and speech',
      'State-of-the-art computer vision for image and video analysis',
      'Predictive analytics to forecast trends and behaviors',
      'Development of intelligent chatbots and virtual assistants',
      'AI-driven chatbots for customer support and automation',
      'Comprehensive data mining and analytical solutions'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'scikit-learn', 'Keras', 'Hugging Face', 'NLP.js', 'OpenCV', 'Apache Spark', 'LangChain', 'LLMs', 'FAISS']
  },
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    icon: Code,
    description: 'Tailored software solutions to meet your unique business needs',
    features: [
      'Enterprise-grade software to improve business operations',
      'Custom API development for seamless integrations',
      'Modernization of legacy systems to enhance scalability and performance',
      'Bespoke CRM and ERP solutions for specific industries',
      'Robust and scalable database architecture',
      'Design and implementation of microservices for agile workflows'
    ],
    technologies: ['Java', 'Python', 'Node.js', '.NET', 'React', 'Angular', 'Spring Boot', 'PostgreSQL', 'MongoDB']
  },
  {
    id: 'web-development',
    title: 'Web Application Development',
    icon: Globe,
    description: 'Modern web applications with cutting-edge technologies',
    features: [
      'Responsive and high-performance Progressive Web Apps (PWAs)',
      'Rich Single Page Applications (SPAs) for enhanced user experiences',
      'Comprehensive e-commerce platforms with advanced features',
      'Custom Content Management Systems for easy content updates',
      'Real-time web applications with live updates',
      'Intuitive web portals and dashboards for data visualization'
    ],
    technologies: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'D3.js', 'Svelte', 'Webpack']
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    icon: Smartphone,
    description: 'Native and cross-platform mobile applications',
    features: [
      'Custom mobile applications for iOS and Android platforms',
      'Seamless cross-platform solutions with consistent performance',
      'Intuitive UI/UX designs optimized for mobile experiences',
      'Optimization for app store visibility and rankings',
      'Integration of push notifications for user engagement',
      'Offline-first functionality for uninterrupted usage'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Realm', 'Xamarin', 'Dagger', 'RxJava']
  },
  {
    id: 'devops',
    title: 'DevOps Services',
    icon: Workflow,
    description: 'Streamline your development and operations',
    features: [
      'Setup and optimization of CI/CD pipelines',
      'Infrastructure as Code for reproducible environments',
      'Efficient container management with modern tools',
      'Comprehensive monitoring and logging for insights',
      'Automated testing frameworks for rapid delivery',
      'Release management strategies for smooth deployments'
    ],
    technologies: ['Jenkins', 'GitLab CI', 'Terraform', 'Ansible', 'Docker', 'Kubernetes', 'CircleCI', 'Prometheus', 'ELK Stack']
  },
  {
    id: 'maintenance',
    title: 'Support and Maintenance',
    icon: Wrench,
    description: '24/7 support and maintenance services for your applications',
    features: [
      'Real-time application monitoring and issue resolution',
      'Continuous performance optimization for peak efficiency',
      'Regular security patches and updates to prevent vulnerabilities',
      'Timely bug fixes and issue resolution',
      'Feature enhancements based on evolving needs',
      'Dedicated technical support for critical operations'
    ],
    technologies: ['New Relic', 'Datadog', 'ELK Stack', 'Prometheus', 'Grafana', 'Splunk', 'Nagios', 'AppDynamics']
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    icon: Cloud,
    description: 'Scalable cloud infrastructure and services',
    features: [
      'Seamless migration of applications to the cloud',
      'Development of cloud-native applications for scalability',
      'Design and implementation of serverless architectures',
      'Container orchestration with Kubernetes and Docker',
      'Implementation of robust cloud security measures',
      'Optimization of cloud costs for budget efficiency'
    ],
    technologies: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CloudFormation', 'Istio', 'AWS Lambda']
  },
  
  {
    id: 'staff-augmentation',
    title: 'Staff Augmentation',
    icon: Users,
    description: 'Skilled professionals to strengthen your team',
    features: [
      'Extension of technical teams with vetted experts',
      'Flexible project-based staffing for dynamic requirements',
      'Filling skill gaps with specialized professionals',
      'Engagement models tailored to your needs',
      'Formation of dedicated teams for long-term projects',
      'Remote development teams to expand global reach'
    ],
    technologies: ['Agile', 'Scrum', 'Kanban', 'JIRA', 'Confluence', 'Asana', 'Trello', 'Slack', 'Microsoft Teams']
  }
];

export default function ServiceList() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Service List */}
      <div className="lg:col-span-2 space-y-2">
        {services.map((service, index) => (
          <CardReveal
            key={service.id}
            index={index}>
            <ServiceItem
              service={service}
              isActive={selectedService?.id === service.id}
              onClick={() => setSelectedService(service)}
            />
          </CardReveal>
        ))}
      </div>

      {/* Service Details */}
      <div className="lg:col-span-3">
        <ServiceDetails
          service={selectedService || services[0]}
        />
      </div>
    </div>
  );
}