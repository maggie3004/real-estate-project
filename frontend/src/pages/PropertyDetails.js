import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeart, FaRegHeart, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, 
  FaStar, FaShare, FaPhone, FaEnvelope, FaWhatsapp, FaPrint, 
  FaDownload, FaPlay, FaPause, FaExpand, FaCompress, FaTimes,
  FaWifi, FaParking, FaSwimmingPool, FaDumbbell, FaTree, FaShieldAlt,
  FaUsers, FaCar, FaUtensils, FaShoppingBag, FaGraduationCap, FaHospital
} from 'react-icons/fa';
import { useComparison } from '../context/ComparisonContext';
import properties from '../data/properties';
import { Helmet } from 'react-helmet';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const { addToComparison, removeFromComparison, comparisonProperties } = useComparison();
  
  const isInComparison = comparisonProperties.some(p => p.id === property?.id);

  useEffect(() => {
    const foundProperty = properties.find(p => p.id === parseInt(id));
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      navigate('/listings');
    }
  }, [id, navigate]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
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

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

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

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') setShowLightbox(false);
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this amazing property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaStar },
    { id: 'amenities', label: 'Amenities', icon: FaWifi },
    { id: 'location', label: 'Location', icon: FaMapMarkerAlt },
    { id: 'floorplan', label: 'Floor Plan', icon: FaRulerCombined },
    { id: 'gallery', label: 'Gallery', icon: FaExpand },
  ];

  const amenityIcons = {
    'WiFi': FaWifi,
    'Parking': FaParking,
    'Swimming Pool': FaSwimmingPool,
    'Gym': FaDumbbell,
    'Garden': FaTree,
    'Security': FaShieldAlt,
    'Community Hall': FaUsers,
    'Car Wash': FaCar,
    'Restaurant': FaUtensils,
    'Shopping Center': FaShoppingBag,
    'School': FaGraduationCap,
    'Hospital': FaHospital,
  };

  return (
    <>
      <Helmet>
        <title>{property.title} | Shree Ganesh Real Estate</title>
        <meta name="description" content={property.description || 'Discover premium property details, amenities, and more.'} />
        <link rel="canonical" href={window.location.href} />
        {/* Open Graph */}
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.description || 'Discover premium property details, amenities, and more.'} />
        <meta property="og:image" content={property.images[0]} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={property.title} />
        <meta name="twitter:description" content={property.description || 'Discover premium property details, amenities, and more.'} />
        <meta name="twitter:image" content={property.images[0]} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "SingleFamilyResidence",
            "name": "${property.title}",
            "description": "${property.description || 'Premium property in Mumbai, Pune, or Nashik.'}",
            "image": [${property.images.map(img => `"${img}"`).join(',')}],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${property.address || ''}",
              "addressLocality": "${property.location || ''}",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
            },
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": "${property.area}",
              "unitCode": "SQF"
            },
            "numberOfRooms": "${property.bedrooms}",
            "numberOfBathroomsTotal": "${property.bathrooms}",
            "amenityFeature": [
              ${(property.amenities || []).map(amenity => `{"@type": "LocationFeatureSpecification", "name": "${amenity}", "value": true}`).join(',')}
            ],
            "offers": {
              "@type": "Offer",
              "price": "${property.price}",
              "priceCurrency": "INR"
            },
            ${property.rating ? `"aggregateRating": {"@type": "AggregateRating", "ratingValue": "${property.rating}", "reviewCount": "1"},` : ''}
            ${property.reviews ? `"review": [${property.reviews.map(review => `{"@type": "Review", "author": "${review.author}", "reviewBody": "${review.text}", "reviewRating": {"@type": "Rating", "ratingValue": "${review.rating}"}}`).join(',')}]` : ''}
          }
        `}</script>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                <p className="text-gray-600 flex items-center">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2 text-amber-500" />
                  {property.location}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFavoriteToggle}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {isFavorite ? (
                    <FaHeart className="w-5 h-5 text-white" />
                  ) : (
                    <FaRegHeart className="w-5 h-5 text-gray-600" />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleComparisonToggle}
                  className={`p-3 rounded-full transition-colors ${
                    isInComparison 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <FaStar className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareProperty}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <FaShare className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="relative h-96">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleImageClick(currentImageIndex)}
                  />
                  
                  {/* Navigation Arrows */}
            <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200"
            >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
            </button>
            <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200"
            >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
            </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'ring-2 ring-amber-500' 
                            : 'hover:opacity-80'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
              ))}
            </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                            activeTab === tab.id
                              ? 'border-amber-500 text-amber-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Property Type:</span>
                                <span className="font-medium">{property.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Bedrooms:</span>
                                <span className="font-medium">{property.bedrooms}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Bathrooms:</span>
                                <span className="font-medium">{property.bathrooms}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Area:</span>
                                <span className="font-medium">{property.area} sq ft</span>
                              </div>
                              {property.floor && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Floor:</span>
                                  <span className="font-medium">{property.floor}</span>
                                </div>
                              )}
                              {property.furnishing && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Furnishing:</span>
                                  <span className="font-medium">{property.furnishing}</span>
                                </div>
        )}
      </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                            <p className="text-gray-700 leading-relaxed">
                              {property.description || 'This beautiful property offers modern amenities and a prime location. Perfect for families looking for comfort and convenience.'}
                            </p>
                          </div>
      </div>
                      </motion.div>
                    )}

                    {activeTab === 'amenities' && (
                      <motion.div
                        key="amenities"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {(property.amenities || []).map((amenity, index) => {
                            const Icon = amenityIcons[amenity] || FaStar;
              return (
                              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <Icon className="w-5 h-5 text-amber-500" />
                                <span className="text-gray-700">{amenity}</span>
                              </div>
              );
            })}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'location' && (
                      <motion.div
                        key="location"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <FaMapMarkerAlt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Interactive Map Coming Soon</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Nearby Facilities</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center space-x-2">
                              <FaGraduationCap className="w-4 h-4 text-amber-500" />
                              <span className="text-sm text-gray-700">Schools within 2km</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaHospital className="w-4 h-4 text-amber-500" />
                              <span className="text-sm text-gray-700">Hospitals within 3km</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaShoppingBag className="w-4 h-4 text-amber-500" />
                              <span className="text-sm text-gray-700">Shopping centers nearby</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaCar className="w-4 h-4 text-amber-500" />
                              <span className="text-sm text-gray-700">Public transport accessible</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'floorplan' && (
                      <motion.div
                        key="floorplan"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <FaRulerCombined className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">3D Floor Plan Coming Soon</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'gallery' && (
                      <motion.div
                        key="gallery"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {property.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`${property.title} ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => handleImageClick(index)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Price Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {formatPrice(property.price)}
                    </h2>
                    {property.pricePerSqFt && (
                      <p className="text-gray-600">
                        ₹{property.pricePerSqFt}/sq ft
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                    >
                      <FaPhone className="w-4 h-4 mr-2" />
                      Call Now
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                    >
                      <FaWhatsapp className="w-4 h-4 mr-2" />
                      WhatsApp
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                    >
                      <FaEnvelope className="w-4 h-4 mr-2" />
                      Email Enquiry
                    </motion.button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Property ID:</span>
                      <span className="font-medium">#{property.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Posted:</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    {property.rating && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <FaStar className="w-4 h-4 text-amber-500 mr-1" />
                          <span className="font-medium">{property.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {showLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
              onClick={() => setShowLightbox(false)}
              onKeyDown={handleKeyPress}
              tabIndex={0}
            >
              <div className="relative max-w-4xl max-h-full p-4">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                
                <button
                  onClick={() => setShowLightbox(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
    </>
  );
};

export default PropertyDetails; 