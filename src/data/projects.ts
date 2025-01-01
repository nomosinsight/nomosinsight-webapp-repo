interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  image: string;
  technologies: string[];
  achievements?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'AI-Powered Healthcare Platform',
    client: 'MediCare Solutions',
    description: 'Developed an intelligent healthcare platform integrating LLMs for automated patient support, appointment scheduling, and medical record analysis.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop',
    technologies: ['React', 'Python', 'OpenAI', 'FastAPI', 'PostgreSQL'],
    achievements: '70% reduction in patient wait times, 99.9% uptime',
    features: [
      'AI-powered patient triage system',
      'Real-time appointment scheduling',
      'Secure medical record management',
      'Automated prescription renewal',
      'Integration with existing hospital systems'
    ],
    timeline: 'Completed in 6 months',
    demoUrl: 'https://medicare-demo.example.com',
    githubUrl: 'https://github.com/example/medicare-platform'
  },
  {
    id: '2',
    name: 'E-commerce Transformation',
    client: 'Global Retail Corp',
    description: 'Built a scalable e-commerce platform with real-time inventory management, AI-powered recommendations, and seamless payment integration.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop',
    technologies: ['Next.js', 'Node.js', 'Redis', 'AWS', 'Stripe'],
    achievements: '200% increase in online sales, 45% better conversion rate',
    features: [
      'Real-time inventory tracking',
      'AI-powered product recommendations',
      'Multi-currency support',
      'Advanced analytics dashboard',
      'Mobile-first responsive design'
    ],
    timeline: 'Completed in 4 months',
    demoUrl: 'https://retail-demo.example.com'
  },
  {
    id: '3',
    name: 'Smart Manufacturing Dashboard',
    client: 'TechManufacture Inc',
    description: 'Created an IoT-enabled manufacturing dashboard for real-time monitoring, predictive maintenance, and automated quality control.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow', 'MongoDB'],
    achievements: '35% reduction in downtime, 50% faster issue resolution',
    features: [
      'Real-time equipment monitoring',
      'Predictive maintenance alerts',
      'Quality control automation',
      'Performance analytics',
      'Mobile app for floor managers'
    ],
    timeline: 'Completed in 8 months',
    demoUrl: 'https://manufacturing-demo.example.com',
    githubUrl: 'https://github.com/example/smart-manufacturing'
  }
];