interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  centered = true,
  light = false 
}: SectionTitleProps) {
  const alignment = centered ? 'text-center' : 'text-left';
  const textColor = light ? 'text-white' : 'text-gray-900';
  const subtitleColor = light ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`mb-16 ${alignment}`}>
      <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-4`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-xl ${subtitleColor} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}