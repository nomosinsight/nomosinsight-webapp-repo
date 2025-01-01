import { Check } from 'lucide-react';
import type { Service } from '../../types/service';

interface ServiceDetailsProps {
  service: Service;
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        {service.title}
      </h3>
      <p className="text-gray-600 mb-6">
        {service.description}
      </p>

      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Key Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-[#FFD700]" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {service.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}