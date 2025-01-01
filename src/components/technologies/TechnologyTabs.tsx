import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TechCategory } from '../../types/technology';

interface TechnologyTabsProps {
  categories: TechCategory[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function TechnologyTabs({ 
  categories, 
  activeTab, 
  onTabChange 
}: TechnologyTabsProps) {
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
    <div className="relative w-full mb-12">
      {/* Scroll Indicators */}
      {showLeftScroll && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden" />
      )}
      {showRightScroll && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
      )}

      {/* Navigation Buttons */}
      {showLeftScroll && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-50 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}
      {showRightScroll && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-50 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Tabs Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide touch-pan-x"
        onScroll={checkScroll}
      >
        <div className="flex md:justify-center space-x-2 px-4 md:px-0 py-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onTabChange(category.id)}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                activeTab === category.id
                  ? 'bg-[#FFD700] text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}