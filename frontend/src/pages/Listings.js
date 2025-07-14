import React, { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiMapPin, 
  FiDollarSign, 
  FiHome, 
  FiSquare,
  FiGrid,
  FiList,
  FiSliders,
  FiX
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import { Helmet } from 'react-helmet';

export default function Listings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  
  // Search and Filter States
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    propertyType: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    maxArea: '',
    parking: '',
    furnished: '',
    amenities: []
  });
  
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/properties')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch properties');
        return res.json();
      })
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Helper to convert price to number
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      if (price.includes('Cr')) {
        return parseFloat(price.replace(/[^\d.]/g, '')) * 10000000;
      } else if (price.includes('Lakhs')) {
        return parseFloat(price.replace(/[^\d.]/g, '')) * 100000;
      }
      return parseFloat(price.replace(/[^\d.]/g, ''));
    }
    return price;
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      propertyType: '',
      status: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: '',
      parking: '',
      furnished: '',
      amenities: []
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  // Filter properties
  const filtered = properties.filter((property) => {
    const price = parsePrice(property.price);
    const min = filters.minPrice ? parsePrice(filters.minPrice) : 0;
    const max = filters.maxPrice ? parsePrice(filters.maxPrice) : Infinity;
    const area = property.area || 0;
    const minArea = filters.minArea ? parseFloat(filters.minArea) : 0;
    const maxArea = filters.maxArea ? parseFloat(filters.maxArea) : Infinity;

    return (
      (!filters.search || 
        property.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.description?.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.location || 
        property.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.propertyType || property.type === filters.propertyType) &&
      (!filters.status || property.status === filters.status) &&
      (!filters.bedrooms || property.bedrooms === parseInt(filters.bedrooms)) &&
      (!filters.bathrooms || property.bathrooms === parseInt(filters.bathrooms)) &&
      (!filters.parking || property.parking === parseInt(filters.parking)) &&
      (!filters.furnished || property.furnished === filters.furnished) &&
      price >= min && price <= max &&
      area >= minArea && area <= maxArea
    );
  });

  // Sort properties
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parsePrice(a.price) - parsePrice(b.price);
      case 'price-high':
        return parsePrice(b.price) - parsePrice(a.price);
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'oldest':
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      case 'popular':
        return (b.views || 0) - (a.views || 0);
      default:
        return 0;
    }
  });

  return (
    <>
      <Helmet>
        <title>Property Listings | Shree Ganesh Real Estate</title>
        <meta name="description" content="Browse all premium properties for sale and rent in Mumbai, Pune, and Nashik. Filter by location, price, amenities, and more." />
        <link rel="canonical" href={window.location.origin + '/listings'} />
        {/* Open Graph */}
        <meta property="og:title" content="Property Listings | Shree Ganesh Real Estate" />
        <meta property="og:description" content="Browse all premium properties for sale and rent in Mumbai, Pune, and Nashik. Filter by location, price, amenities, and more." />
        <meta property="og:image" content={window.location.origin + '/og-image.jpg'} />
        <meta property="og:url" content={window.location.origin + '/listings'} />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Property Listings | Shree Ganesh Real Estate" />
        <meta name="twitter:description" content="Browse all premium properties for sale and rent in Mumbai, Pune, and Nashik. Filter by location, price, amenities, and more." />
        <meta name="twitter:image" content={window.location.origin + '/twitter-image.jpg'} />
        {/* JSON-LD WebPage Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Property Listings",
            "description": "Browse all premium properties for sale and rent in Mumbai, Pune, and Nashik. Filter by location, price, amenities, and more.",
            "url": "${window.location.origin}/listings"
          }
        `}</script>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Property</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the perfect home from our extensive collection of properties across prime locations.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
                  placeholder="Search properties by title, description, or location..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Location Input */}
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Filter Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                  showFilters 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiSliders className="w-5 h-5" />
                Filters
              </motion.button>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => {
                  if (Array.isArray(value) ? value.length > 0 : value !== '') {
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                      >
                        {key}: {Array.isArray(value) ? value.join(', ') : value}
                        <button
                          onClick={() => handleFilterChange(key, Array.isArray(value) ? [] : '')}
                          className="ml-1 hover:text-primary-900"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </motion.div>
                    );
                  }
                  return null;
                })}
                <button
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">All Types</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="plot">Plot</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">All Status</option>
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                      <option value="sold">Sold</option>
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
        <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>
      </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                    <select
                      value={filters.bathrooms}
                      onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Any</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3+</option>
                    </select>
                  </div>

                  {/* Min Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Max Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Min Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Area (sq ft)</label>
                    <div className="relative">
                      <FiSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="Min Area"
                        value={filters.minArea}
                        onChange={(e) => handleFilterChange('minArea', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Max Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Area (sq ft)</label>
                    <div className="relative">
                      <FiSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="Max Area"
                        value={filters.maxArea}
                        onChange={(e) => handleFilterChange('maxArea', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? 'Loading...' : `${sorted.length} Properties Found`}
              </h2>
              {!loading && sorted.length > 0 && (
                <p className="text-gray-600">
                  Showing {sorted.length} of {properties.length} properties
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-error-600">{error}</p>
            </div>
          )}

          {/* Property Grid/List */}
          {(!loading && !error && sorted.length > 0) ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {sorted.map((property) => (
            <PropertyCard key={property._id || property.id} property={property} />
              ))}
            </div>
          ) : (
            !loading && !error && (
              <div className="text-center py-12">
                <FiHome className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search criteria or filters to find more properties.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            )
          )}
        </div> {/* End of main container */}
      </div>
    </>
  );
} 