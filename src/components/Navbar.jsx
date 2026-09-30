import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Department', path: '#departments' },
    { name: 'Services', path: '#services' },
    { name: 'Issues', path: '#issues' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-800" />
            <span className="ml-2 text-xl font-bold text-gray-900">GovPortal</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path.startsWith('#') ? link.path : undefined}
                className={`${
                  location.pathname === link.path ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-blue-700'
                } px-3 py-2 text-sm font-medium transition-colors duration-200`}
                onClick={() => {
                  if (!link.path.startsWith('#')) {
                    // Navigate logic if needed, but here we just use href for hash links
                  }
                }}
              >
                {link.name}
              </a>
            ))}
            <Link to="/admin/dashboard" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">
              Admin Portal
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link 
              to="/admin/dashboard" 
              className="block px-3 py-2 text-base font-medium text-blue-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
