export const getStorageData = (key, initialValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return initialValue;
  }
};

export const setStorageData = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting to localStorage", error);
  }
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const initializeMockData = () => {
  const hasSeeded = getStorageData('hasSeeded', false);
  if (!hasSeeded) {
    const cat1Id = generateId();
    const cat2Id = generateId();
    const cat3Id = generateId();

    const mockCategories = [
      { id: cat1Id, name: 'Healthcare', status: 'Active', createdAt: new Date().toLocaleDateString() },
      { id: cat2Id, name: 'Transportation', status: 'Active', createdAt: new Date().toLocaleDateString() },
      { id: cat3Id, name: 'Education', status: 'Active', createdAt: new Date().toLocaleDateString() }
    ];

    const dep1Id = generateId();
    const dep2Id = generateId();
    const dep3Id = generateId();
    const dep4Id = generateId();

    const mockDepartments = [
      { id: dep1Id, name: 'Public Health Department', categoryId: cat1Id, categoryName: 'Healthcare', description: 'Oversees public health initiatives.', status: 'Active', createdAt: new Date().toLocaleDateString() },
      { id: dep2Id, name: 'State Medical Board', categoryId: cat1Id, categoryName: 'Healthcare', description: 'Regulates medical professionals.', status: 'Active', createdAt: new Date().toLocaleDateString() },
      { id: dep3Id, name: 'Department of Motor Vehicles', categoryId: cat2Id, categoryName: 'Transportation', description: 'Manages vehicle registrations.', status: 'Active', createdAt: new Date().toLocaleDateString() },
      { id: dep4Id, name: 'Higher Education Commission', categoryId: cat3Id, categoryName: 'Education', description: 'Oversees universities.', status: 'Active', createdAt: new Date().toLocaleDateString() }
    ];

    const mockServices = [
      { id: generateId(), name: 'Vaccination Booking', categoryId: cat1Id, departmentId: dep1Id, categoryName: 'Healthcare', departmentName: 'Public Health Department', description: 'Book appointments for seasonal vaccines.', status: 'Active', createdAt: new Date().toLocaleDateString() },
      { id: generateId(), name: 'Doctor Licensing Application', categoryId: cat1Id, departmentId: dep2Id, categoryName: 'Healthcare', departmentName: 'State Medical Board', description: 'Apply for or renew medical licenses.', status: 'Active', createdAt: new Date().toLocaleDateString() },
      { id: generateId(), name: 'Driving License Renewal', categoryId: cat2Id, departmentId: dep3Id, categoryName: 'Transportation', departmentName: 'Department of Motor Vehicles', description: 'Renew an expired driving license.', status: 'Active', createdAt: new Date().toLocaleDateString() },
      { id: generateId(), name: 'Student Loan Application', categoryId: cat3Id, departmentId: dep4Id, categoryName: 'Education', departmentName: 'Higher Education Commission', description: 'Apply for student loans.', status: 'Active', createdAt: new Date().toLocaleDateString() }
    ];

    const mockIssues = [
      { id: generateId(), title: 'Potholes on Main Highway', categoryId: cat2Id, departmentId: dep3Id, categoryName: 'Transportation', departmentName: 'Department of Motor Vehicles', description: 'Massive potholes near exit 42.', status: 'Pending', createdAt: new Date().toLocaleDateString() },
      { id: generateId(), title: 'Clinic Short Staffed', categoryId: cat1Id, departmentId: dep1Id, categoryName: 'Healthcare', departmentName: 'Public Health Department', description: '4-hour wait time due to shortage of nurses.', status: 'In Progress', createdAt: new Date().toLocaleDateString() }
    ];

    setStorageData('categories', mockCategories);
    setStorageData('departments', mockDepartments);
    setStorageData('services', mockServices);
    setStorageData('issues', mockIssues);
    setStorageData('hasSeeded', true);
  }
};
