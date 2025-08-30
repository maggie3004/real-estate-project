import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const RouteLoader = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return loading ? <LoadingSpinner /> : children;
};

export default RouteLoader;
