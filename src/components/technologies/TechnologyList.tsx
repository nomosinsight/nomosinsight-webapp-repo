import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Technology } from '../../types/technology';

interface TechnologyListProps {
  technologies: Technology[];
}

export default function TechnologyList({ technologies }: TechnologyListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.5;
      const targetScroll = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Indicators */}
      {showLeftScroll && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      )}
      {showRightScroll && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      )}

      {/* Navigation Buttons */}
      {showLeftScroll && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-50 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}
      {showRightScroll && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-50 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Technologies Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
        onScroll={checkScroll}
      >
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="flex-none w-[160px] snap-start bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 mb-3 flex items-center justify-center">
              <img
                src={tech.logo}
                alt={tech.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-900 text-center">
              {tech.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}