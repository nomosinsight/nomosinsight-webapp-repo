export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  image: string;
  technologies: string[];
  achievements?: string;
  features?: string[];
  timeline?: string;
  demoUrl?: string;
  githubUrl?: string;
}