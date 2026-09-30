import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Layers, Building, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getStorageData } from '../utils/localStorage';

const Home = () => {
  const [issues, setIssues] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setIssues(getStorageData('issues', []));
    setDepartments(getStorageData('departments', []).filter(d => d.status === 'Active'));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
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

        {/* Public Sections Display (Just for the landing page visual completeness) */}
        <section id="departments" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Featured Departments</h2>
            {departments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {departments.slice(0, 4).map(dep => (
                  <div key={dep.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-lg text-slate-800 mb-2">{dep.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-3">{dep.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">No active departments to display yet.</p>
            )}
          </div>
        </section>

        <section id="issues" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Recent Public Issues</h2>
            {issues.length > 0 ? (
              <div className="space-y-4">
                {issues.slice(0, 3).map(issue => (
                  <div key={issue.id} className="bg-slate-50 p-5 rounded-lg border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-800">{issue.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{issue.description}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        issue.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {issue.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">No public issues reported yet.</p>
            )}
            <div className="mt-8 text-center">
              <Link to="/admin/issues" className="text-blue-700 font-medium hover:underline">
                View all issues &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
