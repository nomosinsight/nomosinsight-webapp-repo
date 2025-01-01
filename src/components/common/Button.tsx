interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'cta';
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '',
  href,
  onClick
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center border text-base font-medium transition-all duration-300';
  const variants = {
    primary: 'px-6 py-3 rounded-md border-transparent text-gray-900 bg-[#FFD700] hover:bg-[#FFC000]',
    secondary: 'px-6 py-3 rounded-md border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    cta: 'px-8 py-3 rounded-full border-transparent text-gray-900 bg-[#FFD700] hover:bg-[#FFC000] hover:shadow-lg hover:scale-105 shadow-md font-semibold'
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}