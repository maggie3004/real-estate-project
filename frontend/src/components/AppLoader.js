import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const AppLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force loading for exactly 10 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return children;
};

export default AppLoader;
