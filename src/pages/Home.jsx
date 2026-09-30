import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import { Link } from 'react-router-dom';
import { Layers, Building, Briefcase } from 'lucide-react';
const Home = () => {

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <HeroBanner />
      
      <main className="flex-grow">
        {/* Management Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Portal Management Overview</h2>
              <p className="mt-4 text-lg text-gray-600">Quick access to manage different sectors of the government portal.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-100 p-8 text-center hover:shadow-md transition-shadow">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Layers className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Category Management</h3>
                <p className="text-slate-600 mb-6">Manage high-level government categories and sectors.</p>
                <Link to="/admin/categories" className="inline-block bg-blue-700 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors">
                  Add Category
                </Link>
              </div>

              <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-100 p-8 text-center hover:shadow-md transition-shadow">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Building className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Department Management</h3>
                <p className="text-slate-600 mb-6">Organize government departments under specific categories.</p>
                <Link to="/admin/departments" className="inline-block bg-green-700 text-white px-6 py-2 rounded-md font-medium hover:bg-green-800 transition-colors">
                  Add Department
                </Link>
              </div>

              <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-100 p-8 text-center hover:shadow-md transition-shadow">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="h-8 w-8 text-purple-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Service Management</h3>
                <p className="text-slate-600 mb-6">Create and manage public services offered by departments.</p>
                <Link to="/admin/services" className="inline-block bg-purple-700 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-800 transition-colors">
                  Add Service
                </Link>
              </div>
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
};

export default Home;
