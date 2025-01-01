import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import type { Service } from '../../types/service';

interface ServiceItemProps {
  service: Service;
  isActive: boolean;
  onClick: () => void;
}

export default function ServiceItem({ service, isActive, onClick }: ServiceItemProps) {
  const Icon = service.icon;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left p-4 rounded-lg transition-all ${
        isActive
          ? 'bg-[#FFD700] text-gray-900'
          : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-4">
        <motion.div 
          className={`p-2 rounded-lg ${
          isActive ? 'bg-white/20' : 'bg-gray-100'
          }`}
          whileHover={{ rotate: 5 }}
        >
          <Icon className={`w-6 h-6 ${
            isActive ? 'text-gray-900' : 'text-gray-600'
          }`} />
        </motion.div>
        <span className="font-medium">{service.title}</span>
      </div>
    </motion.button>
  );
}