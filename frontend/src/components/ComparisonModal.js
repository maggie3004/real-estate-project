import React from 'react';
import { useComparison } from '../context/ComparisonContext';

const ComparisonModal = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();

  if (comparisonList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50 border-t">
      <h3 className="text-lg font-bold mb-2">Property Comparison</h3>
      <div className="flex gap-4 overflow-x-auto">
        {comparisonList.map((property) => (
          <div key={property.id} className="border rounded p-2 min-w-[200px]">
            <h4 className="font-semibold">{property.title}</h4>
            <p>Price: {property.price}</p>
            <p>Area: {property.area} sqft</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <button onClick={() => removeFromComparison(property.id)} className="text-red-600 text-xs mt-2">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={clearComparison} className="btn btn-secondary mt-2">Clear All</button>
    </div>
  );
};

export default ComparisonModal; 