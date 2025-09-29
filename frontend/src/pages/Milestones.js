import React, { useState, useEffect, useCallback, memo } from 'react';
import { Helmet } from 'react-helmet';
import { FaBuilding, FaUsers, FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaTrophy } from 'react-icons/fa';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const completedProjects = [
  {
    id: 1,
    number: "01",
    title: "Sai Shraddha Apartment",
    description: "A beautifully designed residential complex offering comfortable living with all modern amenities and excellent connectivity. Experience the perfect blend of comfort and convenience in the heart of Nashik.",
    location: "College Road, Nashik",
    completionDate: "2024",
    units: "80 Units",
    area: "1.8 Acres",
    images: [
      "/assets/sai-shraddha-apartment/gallery/front.jpg",
      "/assets/sai-shraddha-apartment/gallery/top-view.jpg",
      "/assets/sai-shraddha-apartment/gallery/parking.jpg",
      "/assets/sai-shraddha-apartment/gallery/floor-plan.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-40.jpg"
    ],
    amenities: ["Garden", "Security", "Parking", "Power Backup", "Water Supply", "Maintenance"],
    features: ["1BHK & 2BHK Apartments", "Quality Construction", "Good Ventilation", "Nearby Schools", "Market Access"],
    status: "Completed",
    category: "Completed Project",
    overlayText: "ELEGANT LIVING SPACES"
  },
  {
    id: 2,
    number: "02",
    title: "Shree Ganesh Heights",
    description: "Premium residential development with modern amenities and excellent location advantages. Rising majestically with a regal presence, this development offers unparalleled luxury and comfort.",
    location: "Nashik",
    completionDate: "2025",
    units: "120 Units",
    area: "2.5 Acres",
    images: [
      "/assets/shree-ganesh-heights/gallery/front.jpeg",
      "/assets/shree-ganesh-heights/gallery/day-front.jpg",
      "/assets/shree-ganesh-heights/gallery/night-front.jpg",
      "/assets/shree-ganesh-heights/gallery/top-view.jpg",
      "/assets/shree-ganesh-heights/gallery/floor-plan.jpeg"
    ],
    amenities: ["Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Garden"],
    features: ["2BHK & 3BHK Apartments", "Quality Construction", "Good Ventilation", "Modern Design"],
    status: "Ongoing",
    category: "Ongoing Project",
    overlayText: "ASCEND TO NEW HEIGHTS"
  },
  {
    id: 3,
    number: "03",
    title: "Shree Ganesh Park",
    description: "A premium residential development with multiple wings offering various apartment configurations. Immerse yourself in an extraordinary living experience curated with elegance and grace.",
    location: "Nashik",
    completionDate: "2025",
    units: "150 Units",
    area: "3.0 Acres",
    images: [
      "/assets/shree-ganesh-park/gallery/a-view.jpg",
      "/assets/shree-ganesh-park/gallery/b-view.jpg",
      "/assets/shree-ganesh-park/gallery/night-view-a.jpg",
      "/assets/shree-ganesh-park/gallery/ter-view.jpg",
      "/assets/shree-ganesh-park/gallery/Wing A 1BHK.jpg",
      "/assets/shree-ganesh-park/gallery/Wing A 2BHK.jpg",
      "/assets/shree-ganesh-park/gallery/Wing C 1BHK.jpg",
      "/assets/shree-ganesh-park/gallery/Wing C 2BHK.jpg"
    ],
    amenities: ["Garden", "Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Club House"],
    features: ["1BHK & 2BHK Apartments", "Multiple Wings", "Quality Construction", "Modern Amenities", "Green Spaces"],
    status: "Ongoing",
    category: "Ongoing Project",
    overlayText: "NATURE'S EMBRACE"
  },
  {
    id: 4,
    number: "04",
    title: "Shree Ganesh Srushti",
    description: "Latest residential development with contemporary design and all modern facilities. Discover a sanctuary where peace, serenity, and rejuvenation converge in perfect harmony.",
    location: "Nashik",
    completionDate: "2025",
    units: "100 Units",
    area: "2.0 Acres",
    images: [
      "/assets/shree-ganesh-srushti/gallery/front.jpg",
      "/assets/shree-ganesh-srushti/gallery/night.jpg",
      "/assets/shree-ganesh-srushti/gallery/1bhk.jpg",
      "/assets/shree-ganesh-srushti/gallery/1bhk (2).jpg",
      "/assets/shree-ganesh-srushti/gallery/2bhk.jpg",
      "/assets/shree-ganesh-srushti/gallery/2bhk (2).jpg"
    ],
    amenities: ["Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Garden", "Gym"],
    features: ["2BHK & 3BHK Apartments", "Contemporary Design", "Quality Construction", "Modern Amenities"],
    status: "Ongoing",
    category: "Ongoing Project",
    overlayText: "CREATIVE EXCELLENCE"
  }
];

// Milestones data removed since timeline is no longer used

const Milestones = () => {
  // const [activeYear, setActiveYear] = useState(2025); // Commented out since we're not using year navigation
  const [selectedProject, setSelectedProject] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    });
  }, [controls]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    // Prevent body scrolling when modal is open
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
    // Restore body scrolling when modal is closed
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'unset';
  }, []);


  // Image navigation handled inside memoized carousel component

  // Keyboard navigation: close modal on Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && selectedProject) {
        closeProjectModal();
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedProject, closeProjectModal]);

  // Cleanup: restore body scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Generate descriptive labels for images based on filename patterns
  const getImageLabel = (imagePath, index) => {
    const filename = imagePath.split('/').pop().toLowerCase();
    
    // Check for specific patterns in filename
    if (filename.includes('a-view')) return 'Front View';
    if (filename.includes('b-view')) return 'Side View';
    if (filename.includes('night-view')) return 'Night View';
    if (filename.includes('ter-view')) return 'Terrace View';
    if (filename.includes('wing a 1bhk')) return 'Wing A - 1BHK Layout';
    if (filename.includes('wing a 2bhk')) return 'Wing A - 2BHK Layout';
    if (filename.includes('wing c 1bhk')) return 'Wing C - 1BHK Layout';
    if (filename.includes('wing c 2bhk')) return 'Wing C - 2BHK Layout';
    if (filename.includes('photo-2023-05-31-18-16-23')) return 'Main Building View';
    if (filename.includes('photo-2023-05-31-18-16-24')) return 'Exterior View';
    if (filename.includes('photo-2023-05-31-18-16-38')) return 'Building Facade';
    if (filename.includes('photo-2023-05-31-18-16-39')) return 'Side View';
    if (filename.includes('photo-2023-05-31-18-16-40')) return 'Garden View';
    if (filename.includes('photo-2024-07-24-14-16-26')) return 'Main Building View';
    if (filename.includes('photo-2024-08-07-21-22-54')) return 'Exterior View';
    if (filename.includes('photo-2024-08-18-16-26-07')) return 'Building Facade';
    if (filename.includes('photo-2025-07-07-11-48-19')) return 'Main Building View';
    if (filename.includes('photo-2025-07-23-11-14-21')) return 'Exterior View';
    if (filename.includes('photo-2025-07-30-13-43-35')) return 'Building Facade';
    if (filename.includes('whatsapp image 2025-07-22 at 13.17.15 (1)')) return 'Project Progress - Phase 1';
    if (filename.includes('whatsapp image 2025-07-22 at 13.17.15 (2)')) return 'Project Progress - Phase 2';
    if (filename.includes('whatsapp image 2025-07-22 at 13.17.15.jpeg')) return 'Project Progress - Phase 3';
    if (filename.includes('whatsapp image 2025-07-22 at 13.17.16')) return 'Project Progress - Phase 4';
    
    // Default labels based on position for unknown files
    const defaultLabels = [
      'Main View', 'Exterior View', 'Building Facade', 'Side View', 
      'Top View', 'Garden View', 'Parking Area', 'Common Area'
    ];
    
    return defaultLabels[index] || `View ${index + 1}`;
  };

  // Memoized Image Carousel with Lightbox functionality
  const ProjectImageCarousel = memo(function ProjectImageCarousel({ images, title }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const handleNext = useCallback(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const handlePrev = useCallback(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const openLightbox = useCallback((index) => {
      setCurrentIndex(index);
      setIsLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }, []);

    const closeLightbox = useCallback(() => {
      setIsLightboxOpen(false);
      document.body.style.overflow = 'unset';
    }, []);

    // Keyboard navigation
    useEffect(() => {
      const onKey = (e) => {
        if (isLightboxOpen) {
          if (e.key === 'Escape') closeLightbox();
          if (e.key === 'ArrowLeft') handlePrev();
          if (e.key === 'ArrowRight') handleNext();
        } else {
          if (e.key === 'ArrowLeft') handlePrev();
          if (e.key === 'ArrowRight') handleNext();
        }
      };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }, [handlePrev, handleNext, isLightboxOpen, closeLightbox]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);

    return (
      <>
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl">
            <motion.div 
              className="flex h-80 w-full carousel-sliding-container"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.6
              }}
            >
              {images.map((image, index) => (
                <motion.div 
                  key={index} 
                  className="w-full flex-shrink-0 h-full carousel-slide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                    <img
                      src={image}
                      alt={`${title} - ${index + 1}`}
                      className="w-full h-full object-cover carousel-image cursor-pointer hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = '/hero-building.jpg'; }}
                      onClick={() => openLightbox(index)}
                    />
                </motion.div>
              ))}
            </motion.div>

            {images.length > 1 && (
              <>
                <motion.button
                  onClick={handlePrev}
                  className="carousel-button absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-2 rounded-full shadow-lg z-30 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  className="carousel-button absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-2 rounded-full shadow-lg z-30 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronRight className="w-4 h-4" />
                </motion.button>
              </>
            )}

            {images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Click to expand overlay */}
            <div 
              className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 cursor-pointer flex items-center justify-center"
              onClick={() => openLightbox(currentIndex)}
            >
              <motion.div
                className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3"
                whileHover={{ scale: 1.1 }}
              >
                <FaArrowRight className="w-6 h-6 text-primary-600 rotate-45" />
              </motion.div>
            </div>
          </div>

          {/* Image Label */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {getImageLabel(images[currentIndex], currentIndex)}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {title} - Image {currentIndex + 1} of {images.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Click image to expand
            </p>
          </div>

          {images.length > 1 && (
            <div className="flex space-x-2 justify-center">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`carousel-dot w-2 h-2 rounded-full ${
                    index === currentIndex
                      ? 'bg-yellow-500 active'
                      : 'bg-white/50 hover:bg-white/70 dark:bg-gray-300/50 dark:hover:bg-gray-200/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] p-4 sm:p-6"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes className="w-6 h-6" />
              </motion.button>

              {/* Image Container */}
              <div className="relative max-w-5xl max-h-[80vh] w-full mx-auto" onClick={(e) => e.stopPropagation()}>
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${title} - ${currentIndex + 1}`}
                  className="w-full h-full object-contain rounded-lg shadow-2xl max-w-full max-h-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => { e.target.src = '/hero-building.jpg'; }}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '80vh',
                    width: 'auto',
                    height: 'auto'
                  }}
                />

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <motion.button
                      onClick={handlePrev}
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.button>
                    <motion.button
                      onClick={handleNext}
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentIndex + 1} / {images.length}
                  </div>
                )}

                {/* Image Info */}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/50 text-white px-3 sm:px-4 py-2 rounded-lg backdrop-blur-sm max-w-[calc(100%-4rem)] sm:max-w-none">
                  <h4 className="font-semibold text-sm sm:text-base">{getImageLabel(images[currentIndex], currentIndex)}</h4>
                  <p className="text-xs sm:text-sm opacity-90 truncate">{title}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  });

  // Project Modal Component - Original Theme
  const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-full max-h-full relative modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Original Theme */}
            <div className="relative bg-gradient-to-r from-primary-50 to-gold/10 dark:from-primary-900/20 dark:to-gold/10 p-8">
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-lg transform rotate-12 opacity-30"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gold/20 dark:bg-gold/30 rounded-lg transform -rotate-12 opacity-20"></div>
              
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                    {project.category}
                  </h3>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h2>
                </div>
              <button
                onClick={onClose}
                  className="p-3 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-full transition-colors"
              >
                  <FaTimes className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Image Carousel */}
                  <ProjectImageCarousel 
                    images={project.images} 
                    title={project.title} 
                  />

                  {/* Project Details */}
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Project Description
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {project.description}
                      </p>
                    </div>

                    {/* Project Info */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gold/10 dark:bg-gold/20 rounded-lg flex items-center justify-center">
                          <FaMapMarkerAlt className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{project.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gold/10 dark:bg-gold/20 rounded-lg flex items-center justify-center">
                          <FaCalendarAlt className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Completion</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{project.completionDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gold/10 dark:bg-gold/20 rounded-lg flex items-center justify-center">
                          <FaBuilding className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Units</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{project.units}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gold/10 dark:bg-gold/20 rounded-lg flex items-center justify-center">
                          <FaUsers className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Area</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{project.area}</p>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Amenities
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="bg-gold/10 dark:bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Key Features
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };



  return (
    <section className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-[#181818] dark:text-white transition-colors duration-300">
      <Helmet>
        <title>Our Journey of Excellence - Ganesh Yeole Builders | Milestones & Achievements</title>
        <meta name="description" content="Explore our journey of excellence through key milestones and achievements. Discover our completed and ongoing projects that have created homes for hundreds of families." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section - Original Theme with Creative Elements */}
    <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="relative">
            {/* Animated Background Decorative Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-96 h-96 bg-gradient-to-br from-gold/10 via-gray-500/10 to-green-500/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              ></motion.div>
            </div>
            
            {/* Floating Achievement Icons */}
            <div className="absolute top-10 left-10 hidden lg:block">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-gold rounded-full flex items-center justify-center shadow-lg"
              >
                <FaTrophy className="w-8 h-8 text-white" />
              </motion.div>
                </div>
            
            <div className="absolute top-20 right-20 hidden lg:block">
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="w-12 h-12 bg-gradient-to-br from-gold to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <FaStar className="w-6 h-6 text-white" />
              </motion.div>
        </div>

            <div className="absolute bottom-20 left-20 hidden lg:block">
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="w-14 h-14 bg-gradient-to-br from-green-500 to-gold rounded-full flex items-center justify-center shadow-lg"
              >
                <FaBuilding className="w-7 h-7 text-white" />
              </motion.div>
          </div>
            
            <h1 className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#E53935] via-gold to-orange-500 bg-clip-text text-transparent mb-8">
              Our Journey of Excellence
            </h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-[#E53935] via-gold to-orange-500 mx-auto mb-8 rounded-full"
            ></motion.div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Celebrating milestones, achievements, and the trust of <span className="font-bold text-[#E53935]">500+ families</span> across <span className="font-bold text-gold">16+ years</span> of dedicated service
            </p>
            
            {/* Animated Stats Counter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-12 flex justify-center space-x-12"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="text-3xl font-bold text-[#E53935]"
                >
                  500+
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Families</div>
            </div>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.7 }}
                  className="text-3xl font-bold text-gold"
                >
                  16+
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.9 }}
                  className="text-3xl font-bold text-orange-500"
                >
                  50+
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Delivered</div>
      </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Creative Timeline Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative max-w-6xl mx-auto px-4">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-primary-500 via-gold to-orange-500 rounded-full transform -translate-y-1/2"></div>
            
            {/* Progress Dots */}
            <div className="flex justify-between items-start relative z-10">
              {completedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="flex flex-col items-center flex-1 min-w-0 px-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-primary-500 to-gold rounded-full flex items-center justify-center shadow-lg cursor-pointer mb-3"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      const element = document.getElementById(`project-${project.id}`);
                      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    <span className="text-white font-bold text-sm">{project.number}</span>
                  </motion.div>
                  <motion.p 
                    className="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight break-words"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    style={{ 
                      wordBreak: 'break-word',
                      hyphens: 'auto',
                      maxWidth: '100%'
                    }}
                  >
                    {project.title}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Showcase - Original Theme with Creative Elements */}
        <div className="space-y-32">
          {completedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              id={`project-${project.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative ${
                index % 2 === 0 ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'
              }`}
            >
              {/* Floating Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    className="absolute w-2 h-2 bg-gold/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: particleIndex * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
      </div>
              {/* Left Side - Image (or Right Side for alternating) */}
              <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} relative`}>
                {/* Animated Decorative Elements */}
                <motion.div 
                  className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary-500/20 to-gold/20 rounded-lg transform rotate-12 opacity-60"
                  animate={{ 
                    rotate: [12, 15, 12],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-gold/20 to-primary-500/20 rounded-lg transform -rotate-12 opacity-40"
                  animate={{ 
                    rotate: [-12, -15, -12],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                ></motion.div>
                
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group cursor-pointer" onClick={() => openProjectModal(project)}>
            <img
              src={project.images[0]}
              alt={project.title}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => { e.target.src = '/hero-building.jpg'; }}
            />
                  
                  {/* Animated Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Overlay Text with Animation */}
                  <motion.div 
                    className="absolute bottom-6 left-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <p className="text-sm font-semibold tracking-wider opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {project.overlayText}
                    </p>
                  </motion.div>
                  
                  {/* Animated Status Badge */}
                  <motion.div 
                    className="absolute top-6 right-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                      project.status === 'Completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gold text-white'
                    }`}>
            {project.status}
          </span>
                  </motion.div>
                  
                  {/* Interactive Hover Elements */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      className="bg-white/90 rounded-full p-4 shadow-lg"
                    >
                      <FaArrowRight className="w-6 h-6 text-primary-600" />
                    </motion.div>
          </div>

                  {/* Progress Ring for Ongoing Projects */}
                  {project.status === 'Ongoing' && (
                    <div className="absolute top-6 left-6">
                      <motion.div
                        className="w-12 h-12 rounded-full border-4 border-gold/30 border-t-gold"
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      ></motion.div>
          </div>
        )}
          </div>
        </div>

              {/* Right Side - Content (or Left Side for alternating) */}
              <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                {/* Animated Decorative Element */}
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-primary-500/10 to-gold/10 rounded-lg mb-6 relative overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-gold/20"
                    animate={{ 
                      x: [-20, 20, -20],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                </motion.div>
                
                <div>
                  <motion.h3 
                    className="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {project.category}
                  </motion.h3>
                  <motion.div 
                    className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4 relative"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  >
                    {project.number}
                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-gold"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    ></motion.div>
    </motion.div>
                  <motion.h2 
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  >
                    {project.title}
                  </motion.h2>
                </div>
                
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                >
                  {project.description}
                </motion.p>
                
                {/* Animated Project Details */}
        <motion.div 
                  className="grid grid-cols-2 gap-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                >
                  {[
                    { icon: FaMapMarkerAlt, label: "Location", value: project.location },
                    { icon: FaCalendarAlt, label: "Completion", value: project.completionDate },
                    { icon: FaBuilding, label: "Units", value: project.units },
                    { icon: FaUsers, label: "Area", value: project.area }
                  ].map((item, itemIndex) => (
                    <motion.div 
                      key={itemIndex}
                      className="flex items-center space-x-3 group/item"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-10 h-10 bg-gradient-to-br from-gold/10 to-primary-500/10 rounded-lg flex items-center justify-center group-hover/item:from-gold/20 group-hover/item:to-primary-500/20 transition-colors duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="w-5 h-5 text-gold" />
                      </motion.div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                        <p className="font-medium text-gray-900 dark:text-white group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors duration-300">{item.value}</p>
            </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Interactive Read More Button */}
                <motion.button
                  onClick={() => openProjectModal(project)}
                  className="inline-flex items-center space-x-2 text-gray-900 dark:text-white hover:text-gold transition-colors duration-300 group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="font-medium underline relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Read more
                  </motion.span>
            <motion.div
                    className="w-4 h-4 relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.div>
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-gold/10 rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
            ></motion.div>
                </motion.button>
          </div>
        </motion.div>
          ))}
        </div>

        {/* Creative Achievement Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="bg-gradient-to-r from-primary-600 to-gold bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Numbers that speak for our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Happy Families", icon: FaUsers, color: "from-primary-500 to-gold" },
              { number: "16+", label: "Years Experience", icon: FaTrophy, color: "from-gold to-orange-500" },
              { number: "50+", label: "Projects Delivered", icon: FaBuilding, color: "from-orange-500 to-primary-500" },
              { number: "100%", label: "Customer Satisfaction", icon: FaStar, color: "from-green-500 to-gold" }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <achievement.icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {achievement.number}
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA Section - Original Theme with Creative Elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="relative bg-gradient-to-r from-primary-600 to-gold rounded-2xl p-12 text-white overflow-hidden">
            {/* Animated Decorative Elements */}
            <motion.div 
              className="absolute top-6 right-6 w-24 h-24 bg-white/10 rounded-lg transform rotate-12 opacity-30"
              animate={{ 
                rotate: [12, 15, 12],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-6 left-6 w-16 h-16 bg-white/10 rounded-lg transform -rotate-12 opacity-20"
              animate={{ 
                rotate: [-12, -15, -12],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            ></motion.div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
            
            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, particleIndex) => (
                <motion.div
                  key={particleIndex}
                  className="absolute w-1 h-1 bg-white/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: particleIndex * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <div className="relative">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Ready to Be Part of Our Next Milestone?
              </motion.h2>
              <motion.p 
                className="text-xl mb-8 opacity-90 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join thousands of satisfied homeowners who trusted us with their dreams. 
                Let's create something extraordinary together.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button 
                  className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 text-lg relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Explore Our Projects</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-gold/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </motion.button>
                <motion.button 
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-300 text-lg relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Contact Us</span>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeProjectModal}
      />

      {/* Custom Styles for Modal */}
      <style jsx="true" global="true">{`
        /* Prevent body scroll when modal is open */
        body.modal-open {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
        }
        
        /* Modal positioning fixes - Perfect centering with equal margins */
        .modal-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 50 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 2rem !important;
          width: 100vw !important;
          height: 100vh !important;
          margin: 0 !important;
        }
        
        /* Override any conflicting global modal styles */
        .modal-overlay * {
          box-sizing: border-box !important;
        }
        
        .modal-overlay > div {
          margin: 0 !important;
          transform: none !important;
          position: relative !important;
          max-width: calc(100vw - 4rem) !important;
          max-height: calc(100vh - 4rem) !important;
          width: auto !important;
          height: auto !important;
        }
        
        /* Modal content specific styling for perfect centering */
        .modal-content {
          margin: 0 !important;
          transform: none !important;
          position: relative !important;
          max-width: calc(100vw - 4rem) !important;
          max-height: calc(100vh - 4rem) !important;
          width: auto !important;
          height: auto !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        /* Ensure proper centering on all devices with equal margins */
        @media (max-width: 768px) {
          .modal-overlay {
            padding: 1rem !important;
          }
          
          .modal-overlay > div,
          .modal-content {
            max-width: calc(100vw - 2rem) !important;
            max-height: calc(100vh - 2rem) !important;
          }
        }
        
        @media (max-width: 480px) {
          .modal-overlay {
            padding: 0.75rem !important;
          }
          
          .modal-overlay > div,
          .modal-content {
            max-width: calc(100vw - 1.5rem) !important;
            max-height: calc(100vh - 1.5rem) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Milestones;