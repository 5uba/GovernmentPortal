import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">GovPortal</span>
            </div>
            <p className="text-slate-400 text-sm">
              Providing accessible and transparent digital services for all citizens. 
              Committed to efficiency and public welfare.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Departments</a></li>
              <li><a href="#issues" className="hover:text-white transition-colors">Report Issue</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                123 Government Plaza, Capital City
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                1-800-GOV-HELP
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                contact@govportal.gov
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} GovPortal Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
