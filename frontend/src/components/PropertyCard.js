import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaStar, FaShare, FaPhone } from 'react-icons/fa';
import { useComparison } from '../context/ComparisonContext';

const PropertyCard = ({ property, onFavoriteToggle, isFavorite = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-[#FFD700]"
      whileHover={{ y: -8 }}
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
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300">
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#FFD700] hover:bg-[#B22222] text-black hover:text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FFD700] hover:bg-[#B22222] text-black hover:text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
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
        <h3 className="text-xl font-semibold text-black mb-2">{property.title}</h3>
        <div className="flex items-center text-[#FFD700] mb-4">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{property.location}</span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-3">{property.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#B22222] text-lg">₹{formatPrice(property.price)}</span>
          <button
            onClick={() => onFavoriteToggle(property.id)}
            className={`ml-2 px-4 py-2 rounded-full border-2 font-semibold transition-colors duration-200 ${isFavorite ? 'bg-[#B22222] text-white border-[#B22222]' : 'bg-white text-[#B22222] border-[#FFD700] hover:bg-[#FFD700] hover:text-white'}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard; 