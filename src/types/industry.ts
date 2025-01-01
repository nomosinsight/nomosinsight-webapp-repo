import { LucideIcon } from 'lucide-react';

export interface Industry {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  services: string[];
}