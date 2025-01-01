import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import Logo from './common/Logo';
import Button from './common/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'Services', href: '/#services' },
    { name: 'Technologies', href: '/#technologies' },
    { name: 'Industries', href: '/#industries' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact-us' },
  ];

  const isActive = (href: string) => {
    if (href === '/#home') {
      return location.pathname === '/';
    }
    if (href.startsWith('/#')) {
      return location.pathname === '/' && window.location.hash === href.substring(1);
    }
    return location.pathname === href;
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      // If already on homepage, just scroll
      if (location.pathname === '/') {
        scrollToSection(sectionId);
      } else {
        // Navigate to homepage then scroll
        window.location.href = href;
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navItems.map((item) => (
                item.name === 'Contact' ? (
                  <Button
                    key={item.name}
                    href={item.href}
                    variant="cta"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href.startsWith('/#') ? '/' : item.href}
                    onClick={(e) => {
                      if (item.href.startsWith('/#')) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-[#FFD700] font-semibold'
                        : 'text-gray-600 hover:text-[#FFD700]'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#FFD700]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href.startsWith('/#') ? '/' : item.href}
                onClick={(e) => {
                  if (item.href.startsWith('/#')) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'text-[#FFD700] font-semibold'
                    : 'text-gray-600 hover:text-[#FFD700]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}