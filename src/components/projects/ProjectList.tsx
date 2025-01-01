import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types/project';
import ProjectModal from './ProjectModal';
import CardReveal from '../common/CardReveal';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
      const scrollAmount = 400; // Width of one card + gap
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
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FFF8E1] to-transparent pointer-events-none z-10" />
      )}
      {showRightScroll && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FFF8E1] to-transparent pointer-events-none z-10" />
      )}

      {/* Navigation Buttons */}
      {showLeftScroll && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      )}
      {showRightScroll && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      )}

      {/* Projects Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-8 pb-4"
        onScroll={checkScroll}
      >
        {projects.map((project, index) => (
          <CardReveal
            key={project.id}
            index={index}
            className="flex-none w-[400px] snap-start bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <div onClick={() => setSelectedProject(project)}>
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {project.client}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.achievements && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-primary font-medium">
                      {project.achievements}
                    </p>
                  </div>
                )}
              </div>
            </div>
            </div>
          </CardReveal>
        ))}
      </div>
      
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}