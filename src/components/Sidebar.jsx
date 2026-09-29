import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  Layers, 
  Building, 
  Briefcase, 
  AlertTriangle,
  ArrowLeft,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Departments', path: '/admin/departments', icon: Building },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Issues', path: '/admin/issues', icon: AlertTriangle },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col shadow-xl">
      <div className="p-6 flex items-center border-b border-slate-800">
        <Building2 className="h-8 w-8 text-blue-400" />
        <span className="ml-3 text-xl font-bold">Admin Panel</span>
      </div>
      
      <div className="flex-1 py-6 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link 
          to="/"
          className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-3" />
          <span className="font-medium">Back to Website</span>
        </Link>
        <button 
          onClick={() => alert("Logout successful (UI Only)")}
          className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
