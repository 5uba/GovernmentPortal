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
