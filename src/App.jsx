import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CategoryManagement from './pages/CategoryManagement';
import DepartmentManagement from './pages/DepartmentManagement';
import ServiceManagement from './pages/ServiceManagement';
import IssuesManagement from './pages/IssuesManagement';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="/admin/departments" element={<DepartmentManagement />} />
        <Route path="/admin/services" element={<ServiceManagement />} />
        <Route path="/admin/issues" element={<IssuesManagement />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
