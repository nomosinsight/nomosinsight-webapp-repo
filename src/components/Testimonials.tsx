import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import Container from './common/Container';
import Section from './common/Section';
import SectionTitle from './common/SectionTitle';
import TestimonialCard from './testimonials/TestimonialCard';
import TestimonialModal from './testimonials/TestimonialModal';
import type { Testimonial } from '../types/testimonial';

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 416; // card width (400) + margin (16)
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Section background="light">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="What Our Clients Say"
            subtitle="Hear from businesses that have experienced the impact of our solutions"
          />
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </motion.button>

          {/* Testimonials Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-2 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="snap-start">
                <TestimonialCard
                  testimonial={testimonial}
                  onClick={() => setSelectedTestimonial(testimonial)}
                />
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <motion.div
            className="flex justify-center mt-6 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollLeft = index * 416;
                  }
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === Math.floor((scrollContainerRef.current?.scrollLeft || 0) / 416)
                    ? 'bg-primary'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>

        <TestimonialModal
          testimonial={selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
        />
      </Container>
    </Section>
  );
}