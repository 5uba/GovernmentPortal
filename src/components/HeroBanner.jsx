import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative bg-blue-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Community Infrastructure"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Report and Resolve Public Issues
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Help us improve our community. Report infrastructure problems, track the status of your complaints, and hold departments accountable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#services" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-colors"
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="#issues" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 transition-colors"
            >
              Report an Issue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
