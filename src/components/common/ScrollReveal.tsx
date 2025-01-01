import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '' 
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  };

  const motionProps = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 }
      }
    : {
        initial: { opacity: 0, ...directions[direction] },
        animate: isInView 
          ? { 
              opacity: 1, 
              x: 0, 
              y: 0, 
              transition: { 
                duration: 0.4,
                delay,
                ease: [0.21, 0.45, 0.27, 0.9]
              } 
            }
          : { 
              opacity: 0, 
              ...directions[direction] 
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