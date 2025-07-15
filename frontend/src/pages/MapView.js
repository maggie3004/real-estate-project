import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaSearch, FaFilter, FaList, FaMap, 
  FaHome, FaBuilding, FaCar, FaGraduationCap, FaHospital,
  FaShoppingBag, FaUtensils, FaTree, FaWifi, FaParking,
  FaTimes, FaExpand, FaCompress, FaLocationArrow
} from 'react-icons/fa';
import properties from '../data/properties';

const MapView = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000],
    propertyType: 'all',
    bedrooms: 'all',
    area: [0, 5000],
    amenities: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 19.0760, lng: 72.8777 }); // Mumbai
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef(null);

  const amenityOptions = [
    { value: 'parking', label: 'Parking', icon: FaCar },
    { value: 'gym', label: 'Gym', icon: FaBuilding },
    { value: 'garden', label: 'Garden', icon: FaTree },
    { value: 'wifi', label: 'WiFi', icon: FaWifi },
    { value: 'security', label: 'Security', icon: FaBuilding }
  ];

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const bedroomOptions = [
    { value: 'all', label: 'Any' },
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4+', label: '4+ BHK' }
  ];

  // Filter properties based on current filters
  const filteredProperties = properties.filter(property => {
    // Search query
    if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Price range
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
      return false;
    }

    // Property type
    if (filters.propertyType !== 'all' && property.type !== filters.propertyType) {
      return false;
    }

    // Bedrooms
    if (filters.bedrooms !== 'all') {
      if (filters.bedrooms === '4+' && property.bedrooms < 4) return false;
      if (filters.bedrooms !== '4+' && property.bedrooms !== parseInt(filters.bedrooms)) return false;
    }

    // Area
    if (property.area < filters.area[0] || property.area > filters.area[1]) {
      return false;
    }

    // Amenities
    if (filters.amenities.length > 0) {
      const propertyAmenities = property.amenities || [];
      const hasAllAmenities = filters.amenities.every(amenity => 
        propertyAmenities.some(prop => prop.toLowerCase().includes(amenity))
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    // Center map on property
    setMapCenter({ lat: property.coordinates?.lat || 19.0760, lng: property.coordinates?.lng || 72.8777 });
    setZoom(15);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setZoom(14);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const nearbyPlaces = [
    { type: 'school', name: 'International School', distance: '0.5 km', icon: FaGraduationCap },
    { type: 'hospital', name: 'City Hospital', distance: '1.2 km', icon: FaHospital },
    { type: 'shopping', name: 'Mall of India', distance: '0.8 km', icon: FaShoppingBag },
    { type: 'restaurant', name: 'Food Court', distance: '0.3 km', icon: FaUtensils },
    { type: 'park', name: 'Central Park', distance: '1.5 km', icon: FaTree }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#232323] shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#181818] dark:text-white">Property Map</h1>
              <p className="text-gray-600 dark:text-gray-300">Find your perfect property location</p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={getCurrentLocation}
                className="p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
              >
                <FaLocationArrow className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-lg transition-colors ${
                  showFilters ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <FaFilter className="w-5 h-5" />
              </motion.button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'map' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <FaMap className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <FaList className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-6 mb-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                  
                  {/* Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search properties..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="100000"
                        value={filters.priceRange[0]}
                        onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="100000"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {propertyTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {bedroomOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Area Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area: {filters.area[0]} - {filters.area[1]} sq ft
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={filters.area[0]}
                        onChange={(e) => handleFilterChange('area', [parseInt(e.target.value), filters.area[1]])}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={filters.area[1]}
                        onChange={(e) => handleFilterChange('area', [filters.area[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                    <div className="space-y-2">
                      {amenityOptions.map(amenity => {
                        const Icon = amenity.icon;
                        return (
                          <label key={amenity.value} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.amenities.includes(amenity.value)}
                              onChange={() => handleAmenityToggle(amenity.value)}
                              className="mr-2"
                            />
                            <Icon className="w-4 h-4 mr-2 text-amber-500" />
                            <span className="text-sm">{amenity.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="text-sm text-gray-600">
                    {filteredProperties.length} properties found
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nearby Places */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Places</h3>
              <div className="space-y-3">
                {nearbyPlaces.map((place, index) => {
                  const Icon = place.icon;
                  return (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Icon className="w-5 h-5 mr-3 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{place.name}</p>
                        <p className="text-xs text-gray-600">{place.distance}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Map/List View */}
          <div className="lg:col-span-3">
            {viewMode === 'map' ? (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-96 bg-gray-200 relative">
                  {/* Placeholder for actual map integration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FaMapMarkerAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Interactive Map Coming Soon</p>
                      <p className="text-sm text-gray-500">Google Maps integration with property markers</p>
                    </div>
                  </div>
                  
                  {/* Property Markers (simulated) */}
                  {filteredProperties.slice(0, 5).map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`
                      }}
                      onClick={() => handlePropertyClick(property)}
                    >
                      <div className="bg-amber-500 text-white p-2 rounded-full shadow-lg hover:bg-amber-600 transition-colors">
                        <FaHome className="w-4 h-4" />
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white rounded-lg shadow-lg p-2 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                        {formatPrice(property.price)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => handlePropertyClick(property)}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                        <p className="text-gray-600 mb-2 flex items-center">
                          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-amber-500" />
                          {property.location}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>{property.bedrooms} Beds</span>
                          <span>{property.bathrooms} Baths</span>
                          <span>{property.area} sq ft</span>
                        </div>
                        <p className="text-lg font-bold text-amber-600">{formatPrice(property.price)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Details Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.title}</h2>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-lg font-bold text-amber-600">{formatPrice(selectedProperty.price)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="text-lg font-bold text-gray-900">{selectedProperty.area} sq ft</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{selectedProperty.description}</p>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Contact Agent
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView; 