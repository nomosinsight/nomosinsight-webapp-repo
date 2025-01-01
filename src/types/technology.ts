import { LucideIcon } from 'lucide-react';

export interface Technology {
  name: string;
  logo: string;
}

export interface TechCategory {
  id: string;
  label: string;
  technologies: Technology[];
}