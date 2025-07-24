import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaStar, FaShare, FaPhone } from 'react-icons/fa';
import { useComparison } from '../context/ComparisonContext';

const PropertyCard = ({ property, onFavoriteToggle, isFavorite = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addToComparison, removeFromComparison, comparisonProperties } = useComparison();
  
  const isInComparison = comparisonProperties.some(p => p.id === property.id);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleComparisonToggle = () => {
    if (isInComparison) {
      removeFromComparison(property.id);
    } else {
      addToComparison(property);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden group">
        <img
          src={property.images[currentImageIndex]}
          srcSet={`
            ${property.images[currentImageIndex]} 1x,
            ${property.images[currentImageIndex]} 2x
          `}
          sizes="(max-width: 640px) 100vw, 33vw"
          alt={property.title ? `Photo of ${property.title}` : 'Property image'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Image Navigation */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {property.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onFavoriteToggle(property.id)}
            className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            {isFavorite ? (
              <FaHeart className="w-4 h-4 text-white" />
            ) : (
              <FaRegHeart className="w-4 h-4 text-gray-600" />
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleComparisonToggle}
            className={`rounded-full p-2 shadow-lg transition-all duration-200 ${
              isInComparison 
                ? 'bg-amber-500 text-white' 
                : 'bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-600'
            }`}
          >
            <FaStar className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Status Badge */}
        {property.status && (
          <div className="absolute top-3 left-3">
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {property.status}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price and Rating */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatPrice(property.price)}
            </h3>
            {property.pricePerSqFt && (
              <p className="text-sm text-gray-500">
                ₹{property.pricePerSqFt}/sq ft
              </p>
            )}
          </div>
          {property.rating && (
            <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
              <FaStar className="w-3 h-3 text-amber-500 mr-1" />
              <span className="text-sm font-semibold text-amber-700">
                {property.rating}
              </span>
            </div>
          )}
        </div>

        {/* Title and Location */}
        <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h4>
        <div className="flex items-center text-gray-600 mb-4">
          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-amber-500" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <FaBed className="w-4 h-4 mr-2 text-amber-500" />
            <span className="text-sm text-gray-700">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <FaBath className="w-4 h-4 mr-2 text-amber-500" />
            <span className="text-sm text-gray-700">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <FaRulerCombined className="w-4 h-4 mr-2 text-amber-500" />
            <span className="text-sm text-gray-700">{property.area} sq ft</span>
          </div>
        </div>

        {/* Amenities Preview */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
          >
            <FaPhone className="w-4 h-4 mr-2" />
            Enquire Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
          >
            <FaShare className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard; 