import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { getStorageData, setStorageData, generateId } from '../utils/localStorage';
import { Plus, Search } from 'lucide-react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', status: 'Active' });

  useEffect(() => {
    setCategories(getStorageData('categories', []));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Category name is required.");
      return;
    }

    let updatedCategories;
    if (editingItem) {
      updatedCategories = categories.map(cat => 
        cat.id === editingItem.id ? { ...cat, name: formData.name, status: formData.status } : cat
      );
    } else {
      const newCategory = {
        id: generateId(),
        name: formData.name,
        status: formData.status,
        createdAt: new Date().toLocaleDateString()
      };
      updatedCategories = [...categories, newCategory];
    }

    setCategories(updatedCategories);
    setStorageData('categories', updatedCategories);
    setIsModalOpen(false);
    setFormData({ name: '', status: 'Active' });
    setEditingItem(null);
  };

  const handleEdit = (category) => {
    setEditingItem(category);
    setFormData({ name: category.name, status: category.status });
    setIsModalOpen(true);
  };

  const handleDelete = (category) => {
    const departments = getStorageData('departments', []);
    const hasLinkedDepartments = departments.some(dep => dep.categoryId === category.id);

    if (hasLinkedDepartments) {
      alert("Cannot delete category because it has associated departments. Delete them first.");
      return;
    }

    if (window.confirm(`Are you sure you want to delete category "${category.name}"?`)) {
      const updatedCategories = categories.filter(c => c.id !== category.id);
      setCategories(updatedCategories);
      setStorageData('categories', updatedCategories);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'S.No', accessor: 'sno' },
    { header: 'Category Name', accessor: 'name' },
    { header: 'Status', accessor: 'status' },
    { header: 'Created Date', accessor: 'createdAt' }
  ];

  return (
    <AdminLayout title="Category Management">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search categories..."
            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => {
            setEditingItem(null);
            setFormData({ name: '', status: 'Active' });
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredCategories} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? 'Edit Category' : 'Add Category'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category Name *</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Healthcare, Education"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
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

export default CategoryManagement;
