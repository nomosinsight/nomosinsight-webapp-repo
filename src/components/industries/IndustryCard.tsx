import type { Industry } from '../../types/industry';

interface IndustryCardProps {
  industry: Industry;
  onClick: () => void;
}

export default function IndustryCard({ industry, onClick }: IndustryCardProps) {
  const Icon = industry.icon;

  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-xl p-6 text-left transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {industry.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {industry.description}
          </p>
        </div>
      </div>
    </button>
  );
}