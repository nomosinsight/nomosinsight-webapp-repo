import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Star, X, Quote } from 'lucide-react';
import type { Testimonial } from '../../types/testimonial';

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

export default function TestimonialModal({ testimonial, onClose }: TestimonialModalProps) {
  if (!testimonial) return null;

  return (
    <Transition appear show={!!testimonial} as={Fragment}>
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
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="absolute right-6 top-6">
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="mb-6">
                  <Dialog.Title className="text-xl font-semibold text-gray-900 mb-2">
                    {testimonial.name}
                  </Dialog.Title>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-primary">{testimonial.company}</p>
                    <span className="mx-2 text-gray-300">•</span>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                  <blockquote className="relative pl-8 pr-4 py-4 text-gray-600 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>

                {testimonial.rating && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-[#FFD700] fill-current"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}