import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { getStorageData, setStorageData, generateId } from '../utils/localStorage';
import { Plus, Search } from 'lucide-react';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    categoryId: '', 
    departmentId: '', 
    description: '', 
    status: 'Active' 
  });

  useEffect(() => {
    setServices(getStorageData('services', []));
    setCategories(getStorageData('categories', []));
    setDepartments(getStorageData('departments', []));
  }, []);

  // Update filtered departments when category changes
  useEffect(() => {
    if (formData.categoryId) {
      const deps = departments.filter(d => d.categoryId === formData.categoryId);
      setFilteredDepartments(deps);
      
      // Reset department if current one doesn't belong to the new category
      if (formData.departmentId && !deps.some(d => d.id === formData.departmentId)) {
        setFormData(prev => ({ ...prev, departmentId: '' }));
      }
    } else {
      setFilteredDepartments([]);
    }
  }, [formData.categoryId, departments]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.categoryId || !formData.departmentId || !formData.description.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    const category = categories.find(c => c.id === formData.categoryId);
    const department = departments.find(d => d.id === formData.departmentId);
    
    const categoryName = category ? category.name : 'Unknown';
    const departmentName = department ? department.name : 'Unknown';

    let updatedServices;
    if (editingItem) {
      updatedServices = services.map(srv => 
        srv.id === editingItem.id ? { ...srv, ...formData, categoryName, departmentName } : srv
      );
    } else {
      const newService = {
        id: generateId(),
        ...formData,
        categoryName,
        departmentName,
        createdAt: new Date().toLocaleDateString()
      };
      updatedServices = [...services, newService];
    }

    setServices(updatedServices);
    setStorageData('services', updatedServices);
    setIsModalOpen(false);
    setFormData({ name: '', categoryId: '', departmentId: '', description: '', status: 'Active' });
    setEditingItem(null);
  };

  const handleEdit = (service) => {
    setEditingItem(service);
    setFormData({ 
      name: service.name, 
      categoryId: service.categoryId, 
      departmentId: service.departmentId,
      description: service.description,
      status: service.status 
    });
    setIsModalOpen(true);
  };

  const handleDelete = (service) => {
    if (window.confirm(`Are you sure you want to delete service "${service.name}"?`)) {
      const updatedServices = services.filter(s => s.id !== service.id);
      setServices(updatedServices);
      setStorageData('services', updatedServices);
    }
  };

  const filteredServices = services
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(s => {
      const cat = categories.find(c => c.id === s.categoryId);
      const dep = departments.find(d => d.id === s.departmentId);
      return { 
        ...s, 
        categoryName: cat ? cat.name : 'Unknown (Deleted)',
        departmentName: dep ? dep.name : 'Unknown (Deleted)'
      };
    });

  const columns = [
    { header: 'S.No', accessor: 'sno' },
    { header: 'Service Name', accessor: 'name' },
    { header: 'Category Name', accessor: 'categoryName' },
    { header: 'Department Name', accessor: 'departmentName' },
    { header: 'Description', accessor: 'description' },
    { header: 'Status', accessor: 'status' }
  ];

  return (
    <AdminLayout title="Service Management">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search services..."
            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => {
            if (categories.length === 0) {
              alert("Please add a category first.");
              return;
            }
            if (departments.length === 0) {
              alert("Please add a department first.");
              return;
            }
            setEditingItem(null);
            setFormData({ name: '', categoryId: '', departmentId: '', description: '', status: 'Active' });
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredServices} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? 'Edit Service' : 'Add Service'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service Name *</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Identity Card Renewal"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
            <select 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              value={formData.categoryId}
              onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department *</label>
            <select 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white disabled:bg-slate-100 disabled:text-slate-400"
              value={formData.departmentId}
              onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
              required
              disabled={!formData.categoryId || filteredDepartments.length === 0}
            >
              <option value="" disabled>
                {!formData.categoryId ? 'Select a category first' : filteredDepartments.length === 0 ? 'No departments in this category' : 'Select a department'}
              </option>
              {filteredDepartments.map(dep => (
                <option key={dep.id} value={dep.id}>{dep.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Brief description of the service"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </FormModal>
    </AdminLayout>
  );
};

export default ServiceManagement;
