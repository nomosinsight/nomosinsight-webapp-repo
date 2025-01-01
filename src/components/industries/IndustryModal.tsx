import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';
import type { Industry } from '../../types/industry';

interface IndustryModalProps {
  industry: Industry | null;
  onClose: () => void;
}

export default function IndustryModal({ industry, onClose }: IndustryModalProps) {
  if (!industry) return null;

  const Icon = industry.icon;

  return (
    <Transition appear show={!!industry} as={Fragment}>
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <Dialog.Title className="text-2xl font-semibold text-gray-900">
                    {industry.name}
                  </Dialog.Title>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-600">{industry.description}</p>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">
                      Our Services
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {industry.services.map((service) => (
                        <li
                          key={service}
                          className="flex items-center space-x-2 text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={onClose}
                      className="w-full bg-primary text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                    >
                      Close
                    </button>
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