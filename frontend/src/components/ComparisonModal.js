import React from 'react';
import { useComparison } from '../context/ComparisonContext';

const ComparisonModal = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();

  if (comparisonList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black shadow-lg p-4 z-50 border-t dark:border-gray-800">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Property Comparison</h3>
      <div className="flex gap-4 overflow-x-auto">
        {comparisonList.map((property) => (
          <div key={property.id} className="border rounded p-2 min-w-[200px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white">{property.title}</h4>
            <p className="text-gray-700 dark:text-gray-300">Price: {property.price}</p>
            <p className="text-gray-700 dark:text-gray-300">Area: {property.area} sqft</p>
            <p className="text-gray-700 dark:text-gray-300">Bedrooms: {property.bedrooms}</p>
            <button onClick={() => removeFromComparison(property.id)} className="text-red-600 dark:text-red-400 text-xs mt-2">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={clearComparison} className="btn btn-secondary mt-2">Clear All</button>
    </div>
  );
};

export default ComparisonModal; 