import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface CardRevealProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export default function CardReveal({ children, index = 0, className = '' }: CardRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  // Alternate between left and right for even/odd indices
  const direction = index % 2 === 0 ? -40 : 40;

  const motionProps = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 }
      }
    : {
        initial: { opacity: 0, x: direction, y: 20 },
        animate: isInView 
          ? { 
              opacity: 1, 
              x: 0, 
              y: 0, 
              transition: { 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 0.45, 0.27, 0.9]
              } 
            }
          : { 
              opacity: 0, 
              x: direction, 
              y: 20 
            }
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}