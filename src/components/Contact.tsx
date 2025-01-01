import { useState } from 'react';
import { Mail, MapPin, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { companyInfo } from '../constants/content';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const form = e.currentTarget;
    
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        EMAILJS_PUBLIC_KEY
      );
      
      setSuccess(true);
      form.reset();
    } catch (err: any) {
      console.error('EmailJS Error:', err);
      setError(err?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business? Let's discuss how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  placeholder="Your name"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#FFD700] focus:ring-[#FFD700] outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  placeholder="Your email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#FFD700] focus:ring-[#FFD700] outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Your message"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#FFD700] focus:ring-[#FFD700] outline-none resize-none"
                ></textarea>
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              {success && (
                <p className="text-sm text-green-600">Message sent successfully!</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFD700] text-gray-900 py-3 px-6 rounded-md hover:bg-[#FFC000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Email</p>
                    <a href={`mailto:${companyInfo.email}`} className="text-gray-600 hover:text-[#FFD700] transition-colors">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Location</p>
                    <address className="text-gray-600 not-italic">
                      {companyInfo.location}
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}