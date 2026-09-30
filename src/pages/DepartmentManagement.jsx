import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { getStorageData, setStorageData, generateId } from '../utils/localStorage';
import { Plus, Search } from 'lucide-react';

const DepartmentManagement = ({ inline = false }) => {
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    categoryId: '', 
    description: '', 
    status: 'Active' 
  });

  useEffect(() => {
    setDepartments(getStorageData('departments', []));
    setCategories(getStorageData('categories', []));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.categoryId || !formData.description.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    const category = categories.find(c => c.id === formData.categoryId);
    const categoryName = category ? category.name : 'Unknown';

    let updatedDepartments;
    if (editingItem) {
      updatedDepartments = departments.map(dep => 
        dep.id === editingItem.id ? { ...dep, ...formData, categoryName } : dep
      );
    } else {
      const newDepartment = {
        id: generateId(),
        ...formData,
        categoryName,
        createdAt: new Date().toLocaleDateString()
      };
      updatedDepartments = [...departments, newDepartment];
    }

    setDepartments(updatedDepartments);
    setStorageData('departments', updatedDepartments);
    setIsModalOpen(false);
    setFormData({ name: '', categoryId: '', description: '', status: 'Active' });
    setEditingItem(null);
  };

  const handleEdit = (department) => {
    setEditingItem(department);
    setFormData({ 
      name: department.name, 
      categoryId: department.categoryId, 
      description: department.description,
      status: department.status 
    });
    setIsModalOpen(true);
  };

  const handleDelete = (department) => {
    const services = getStorageData('services', []);
    const hasLinkedServices = services.some(srv => srv.departmentId === department.id);

    if (hasLinkedServices) {
      alert("Cannot delete department because it has associated services. Delete them first.");
      return;
    }

    if (window.confirm(`Are you sure you want to delete department "${department.name}"?`)) {
      const updatedDepartments = departments.filter(d => d.id !== department.id);
      setDepartments(updatedDepartments);
      setStorageData('departments', updatedDepartments);
    }
  };

  const filteredDepartments = departments
    .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(d => {
      const cat = categories.find(c => c.id === d.categoryId);
      return { ...d, categoryName: cat ? cat.name : 'Unknown (Deleted)' };
    });

  const columns = [
    { header: 'S.No', accessor: 'sno' },
    { header: 'Department Name', accessor: 'name' },
    { header: 'Category Name', accessor: 'categoryName' },
    { header: 'Description', accessor: 'description' },
    { header: 'Status', accessor: 'status' }
  ];

  const content = (
    <div className={inline ? "mt-8 pt-8 border-t border-slate-200" : ""}>
      {inline && <h2 className="text-2xl font-bold mb-6 text-slate-800">Department Management</h2>}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search departments..."
            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => {
            if (categories.length === 0) {
              alert("Please add a category first before adding a department.");
              return;
            }
            setEditingItem(null);
            setFormData({ name: '', categoryId: categories[0]?.id || '', description: '', status: 'Active' });
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredDepartments} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? 'Edit Department' : 'Add Department'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department Name *</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Ministry of Health"
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Brief description of the department"
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
    </div>
  );

  if (inline) return content;

  return (
    <AdminLayout title="Department Management">
      {content}
    </AdminLayout>
  );
};

export default DepartmentManagement;
