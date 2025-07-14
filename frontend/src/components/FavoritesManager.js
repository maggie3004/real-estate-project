import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('userFavorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('userFavorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites, loading]);

  const addToFavorites = (property) => {
    if (!property || !property.id) {
      toast.error('Invalid property data');
      return false;
    }

    const isAlreadyFavorite = favorites.some(fav => fav.id === property.id);
    if (isAlreadyFavorite) {
      toast.info('Property is already in your favorites');
      return false;
    }

    const propertyToAdd = {
      id: property.id || property._id,
      title: property.title,
      price: property.price,
      location: property.location,
      images: property.images || [],
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      type: property.type,
      status: property.status,
      rating: property.rating,
      reviews: property.reviews,
      featured: property.featured,
      addedAt: new Date().toISOString()
    };

    setFavorites(prev => [...prev, propertyToAdd]);
    toast.success('Property added to favorites!');
    return true;
  };

  const removeFromFavorites = (propertyId) => {
    const propertyToRemove = favorites.find(fav => fav.id === propertyId);
    if (!propertyToRemove) {
      toast.error('Property not found in favorites');
      return false;
    }

    setFavorites(prev => prev.filter(fav => fav.id !== propertyId));
    toast.success('Property removed from favorites');
    return true;
  };

  const toggleFavorite = (property) => {
    const isFavorite = favorites.some(fav => fav.id === (property.id || property._id));
    
    if (isFavorite) {
      return removeFromFavorites(property.id || property._id);
    } else {
      return addToFavorites(property);
    }
  };

  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    toast.success('All favorites cleared');
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const getFavoritesByType = (type) => {
    return favorites.filter(fav => fav.type === type);
  };

  const getFavoritesByLocation = (location) => {
    return favorites.filter(fav => 
      fav.location.toLowerCase().includes(location.toLowerCase())
    );
  };

  const getFavoritesByPriceRange = (minPrice, maxPrice) => {
    return favorites.filter(fav => 
      fav.price >= minPrice && fav.price <= maxPrice
    );
  };

  const sortFavorites = (sortBy = 'addedAt') => {
    const sorted = [...favorites];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  };

  const exportFavorites = () => {
    try {
      const dataStr = JSON.stringify(favorites, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'my-favorites.json';
      link.click();
      URL.revokeObjectURL(url);
      toast.success('Favorites exported successfully!');
    } catch (error) {
      console.error('Error exporting favorites:', error);
      toast.error('Failed to export favorites');
    }
  };

  const importFavorites = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedFavorites = JSON.parse(e.target.result);
          if (Array.isArray(importedFavorites)) {
            setFavorites(importedFavorites);
            toast.success('Favorites imported successfully!');
            resolve(true);
          } else {
            throw new Error('Invalid file format');
          }
        } catch (error) {
          console.error('Error importing favorites:', error);
          toast.error('Failed to import favorites. Invalid file format.');
          reject(error);
        }
      };
      reader.onerror = () => {
        toast.error('Failed to read file');
        reject(new Error('Failed to read file'));
      };
      reader.readAsText(file);
    });
  };

  const value = {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    getFavoritesCount,
    getFavoritesByType,
    getFavoritesByLocation,
    getFavoritesByPriceRange,
    sortFavorites,
    exportFavorites,
    importFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}; 