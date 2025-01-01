import Logo from './common/Logo';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo variant="light" />
            <p className="text-gray-400 mb-4">
              Transforming businesses through innovative IT solutions. Your trusted partner in digital transformation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/#home" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/#services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/#industries" className="text-gray-400 hover:text-white transition-colors">Industries</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="break-words">1001-02, Sarthana Business Hub, Sarthana Jakat Naka, Nirmal Nagar Society, Nana Varachha, Surat, Khadsad, Gujarat 395006</li>
              <li>+91 7202030030</li>
              <li>info.nomosinsight@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Nomos Insights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}