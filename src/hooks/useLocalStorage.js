import { useState, useEffect } from "react";

/**
 * Custom hook for localStorage persistence
 * Syncs state with localStorage automatically
 * 
 * @param {string} key - localStorage key
 * @param {*} initialValue - Default value if no stored value exists
 * @returns {Array} [storedValue, setValue] - Similar to useState
 */
function useLocalStorage(key, initialValue) {
  // Get stored value or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
