interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'light' | 'dark' | 'accent';
}

export default function Section({ 
  children, 
  id, 
  className = '',
  background = 'light'
}: SectionProps) {
  const bgColors = {
    light: 'bg-white',
    dark: 'bg-gray-900',
    accent: 'bg-[#FFF8E1]'
  };

  return (
    <section id={id} className={`py-24 ${bgColors[background]} ${className}`}>
      {children}
    </section>
  );
}