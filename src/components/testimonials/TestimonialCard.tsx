import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Testimonial } from '../../types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onClick: () => void;
}

export default function TestimonialCard({ testimonial, onClick }: TestimonialCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex-none w-[300px] bg-white rounded-xl shadow-sm p-6 mx-2 text-left cursor-pointer"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {testimonial.rating && (
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 text-[#FFD700] fill-current"
            />
          ))}
        </div>
      )}
      
      <blockquote className="text-gray-600 leading-relaxed mb-4">
        "{testimonial.quote}"
      </blockquote>
      
      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-900">{testimonial.name}</h3>
        <p className="text-sm text-gray-600">{testimonial.role}</p>
        <div className="flex items-center mt-1">
          <p className="text-sm text-primary">{testimonial.company}</p>
          <span className="mx-2 text-gray-300">•</span>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>
    </motion.button>
  );
}