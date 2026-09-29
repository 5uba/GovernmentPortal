import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Layers, Building, Briefcase, Activity } from 'lucide-react';
import { getStorageData } from '../utils/localStorage';

const Dashboard = () => {
  const [stats, setStats] = useState({
    categories: 0,
    departments: 0,
    services: 0,
    activeServices: 0
  });

  useEffect(() => {
    const cats = getStorageData('categories', []);
    const deps = getStorageData('departments', []);
    const servs = getStorageData('services', []);
    
    setStats({
      categories: cats.length,
      departments: deps.length,
      services: servs.length,
      activeServices: servs.filter(s => s.status === 'Active').length
    });
  }, []);

  const cards = [
    { title: 'Total Categories', value: stats.categories, icon: Layers, color: 'bg-blue-500' },
    { title: 'Total Departments', value: stats.departments, icon: Building, color: 'bg-green-500' },
    { title: 'Total Services', value: stats.services, icon: Briefcase, color: 'bg-purple-500' },
    { title: 'Active Services', value: stats.activeServices, icon: Activity, color: 'bg-amber-500' },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center">
              <div className={`${card.color} p-4 rounded-lg text-white mr-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-slate-800">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Welcome to GovPortal Admin</h2>
        <p className="text-slate-600 mb-4">
          Use the sidebar navigation to manage categories, departments, services, and view public issues. 
          All data is persistently saved in your browser's local storage.
        </p>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 text-sm">
          <strong>Tip:</strong> Always create Categories first, then Departments, and finally Services. Dependencies are strictly enforced to maintain data integrity.
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
