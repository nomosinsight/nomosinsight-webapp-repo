import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  technologies: string[];
}