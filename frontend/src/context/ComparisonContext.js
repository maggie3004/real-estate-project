import React, { createContext, useState, useContext } from 'react';

const ComparisonContext = createContext();

export const useComparison = () => useContext(ComparisonContext);

export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState([]);

  const addToComparison = (property) => {
    setComparisonList((prev) =>
      prev.find((p) => p.id === property.id) ? prev : [...prev, property]
    );
  };

  const removeFromComparison = (id) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== id));
  };

  const clearComparison = () => setComparisonList([]);

  return (
    <ComparisonContext.Provider value={{ 
      comparisonList, 
      comparisonProperties: comparisonList, // Add alias for compatibility
      addToComparison, 
      removeFromComparison, 
      clearComparison 
    }}>
      {children}
    </ComparisonContext.Provider>
  );
}; 