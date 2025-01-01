import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../types/project';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <Transition appear show={!!project} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>

                {/* Project Image */}
                <div className="relative h-[400px]">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
                    <p className="text-lg text-white/90">{project.client}</p>
                  </div>
                </div>

                <div className="p-8">
                  {/* Project Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Project Overview
                      </h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Technologies Used
                      </h3>
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
                    </div>

                    {/* Key Features */}
                    {project.features && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Key Features
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Project Timeline */}
                    {project.timeline && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Project Timeline
                        </h3>
                        <p className="text-gray-600">{project.timeline}</p>
                      </div>
                    )}

                    {/* Achievements */}
                    {project.achievements && (
                      <div className="bg-[#FFF8E1] rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Key Achievements
                        </h3>
                        <p className="text-gray-800">{project.achievements}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}