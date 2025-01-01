import { useState } from 'react';
import { Mail, MapPin, Loader2, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { companyInfo } from '../constants/content';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');

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
    <div className="min-h-screen pt-16 bg-gradient-to-br from-[#FFF8E1] via-white to-[#FFF8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch With Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? Fill up the form and our Team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-[#FFD700] mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Phone</p>
                    <a href="tel:+91 7202030030" className="text-gray-600 hover:text-[#FFD700] transition-colors">
                      +91 7202030030
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-[#FFD700] mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Email</p>
                    <a href={`mailto:${companyInfo.email}`} className="text-gray-600 hover:text-[#FFD700] transition-colors break-all">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-[#FFD700] mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Location</p>
                    <address className="text-gray-600 not-italic">
                      {companyInfo.location}
                    </address>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  We guarantee 100% security of your information. We will not share the details you provide above with anyone. Your email won't be used for spamming.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                How do we help?
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="firstName"
                      required
                      onChange={(e) => {
                        const lastName = (document.getElementById('lastName') as HTMLInputElement)?.value || '';
                        setFullName(`${e.target.value} ${lastName}`.trim());
                      }}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#FFD700] focus:ring-[#FFD700] outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="lastName"
                      required
                      onChange={(e) => {
                        const firstName = (document.getElementById('firstName') as HTMLInputElement)?.value || '';
                        setFullName(`${firstName} ${e.target.value}`.trim());
                      }}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#FFD700] focus:ring-[#FFD700] outline-none"
                    />
                  </div>
                  <input
                    type="hidden"
                    name="user_name"
                    value={fullName}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      id="email"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#FFD700] focus:ring-[#FFD700] outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#FFD700] focus:ring-[#FFD700] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Project Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
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
                    'Submit'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}