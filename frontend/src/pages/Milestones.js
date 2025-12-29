import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { FaBuilding, FaUsers, FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaTrophy } from 'react-icons/fa';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { ScrollDirectionContext } from '../context/ScrollDirectionContext';
// Swiper imports removed as they are not being used

// Top 5 Projects for Featured Display
const completedProjects = [
  {
    id: 1,
    number: "01",
    title: "Sai Shraddha Apartment",
    description: "A beautifully designed residential complex offering comfortable living with all modern amenities and excellent connectivity. Experience the perfect blend of comfort and convenience in the heart of Nashik. Located on College Road with 24 units across prime location.",
    location: "Khutwad Nagar, Nashik",
    completionDate: "2023",
    units: "24 Units",
    area: "Prime Location",
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
    title: "Vinayak Apartment",
    description: "A Prime Project in a Prime Location. Located in the Makhamalabad area, Vinayak Apartment is a distinguished residential development that blends luxury, space, and thoughtful design. This elegant project features spacious apartments with excellent ventilation, ensuring a bright and airy living experience.",
    location: "Makhamalabad, Nashik",
    completionDate: "2023",
    units: "10 Units",
    area: "Prime Location",
    images: [
      "/assets/sai-shraddha-apartment/gallery/front.jpg",
      "/assets/sai-shraddha-apartment/gallery/top-view.jpg",
      "/assets/sai-shraddha-apartment/gallery/parking.jpg",
      "/assets/sai-shraddha-apartment/gallery/floor-plan.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-40.jpg"
    ],
    amenities: ["Commercial Space", "Security", "Parking", "Power Backup", "Water Supply", "Maintenance"],
    features: ["2BHK Apartments", "Premium Construction", "Excellent Ventilation", "Prime Location", "Modern Design"],
    status: "Completed",
    category: "Completed Project",
    overlayText: "PRIME LOCATION LIVING"
  },
  {
    id: 3,
    number: "03",
    title: "Shree Ganesh Avenue",
    description: "Affordable & Spacious Living in Gangapur. Shree Ganesh Avenue offers well-planned 1 & 2 BHK homes with superior construction quality, ample space, and excellent ventilation. Combining affordability with modern comforts, it quickly became a high-demand project in Gangapur Shivar.",
    location: "Gangapur Shivar, Nashik",
    completionDate: "2022",
    units: "45 Units",
    area: "Prime Location",
    images: [
      "/assets/sai-shraddha-apartment/gallery/front.jpg",
      "/assets/sai-shraddha-apartment/gallery/top-view.jpg",
      "/assets/sai-shraddha-apartment/gallery/parking.jpg",
      "/assets/sai-shraddha-apartment/gallery/floor-plan.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-40.jpg"
    ],
    amenities: ["Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Garden"],
    features: ["1BHK & 2BHK Apartments", "Affordable Pricing", "Quality Construction", "Smart Design", "Seamless Connectivity"],
    status: "Completed",
    category: "Completed Project",
    overlayText: "AFFORDABLE EXCELLENCE"
  },
  {
    id: 4,
    number: "04",
    title: "Shree Ganesh Apartment",
    description: "A premium residential development offering modern living with excellent connectivity and amenities. This project combines quality construction with thoughtful design to provide comfortable and convenient living spaces for families. Located in a well-connected area with easy access to schools, markets, and transportation hubs.",
    location: "Gangapur Shivar, Nashik",
    completionDate: "2021",
    units: "25 Units",
    area: "Well-Connected Area",
    images: [
      "/assets/sai-shraddha-apartment/gallery/front.jpg",
      "/assets/sai-shraddha-apartment/gallery/top-view.jpg",
      "/assets/sai-shraddha-apartment/gallery/parking.jpg",
      "/assets/sai-shraddha-apartment/gallery/floor-plan.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-40.jpg"
    ],
    amenities: ["Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Garden"],
    features: ["Quality Construction", "Modern Design", "Good Connectivity", "Family-Friendly", "Well-Planned Layout"],
    status: "Completed",
    category: "Completed Project",
    overlayText: "MODERN LIVING"
  },
  {
    id: 5,
    number: "05",
    title: "Modakeshwar Apartment",
    description: "Exclusive Living at Wasan Nagar. Located in the prime area of Wasan Nagar, Pathardi, Modakeshwar Apartment is an exclusive standalone residential project offering limited yet luxurious apartments. With its modern elevation, premium construction quality, and thoughtfully designed spaces, this project redefines elegant and comfortable living.",
    location: "Pathardi Wasan Nagar, Nashik",
    completionDate: "2020",
    units: "16 Units",
    area: "Prime Location",
    images: [
      "/assets/sai-shraddha-apartment/gallery/front.jpg",
      "/assets/sai-shraddha-apartment/gallery/top-view.jpg",
      "/assets/sai-shraddha-apartment/gallery/parking.jpg",
      "/assets/sai-shraddha-apartment/gallery/floor-plan.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-40.jpg"
    ],
    amenities: ["Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Garden"],
    features: ["Exclusive Apartments", "Modern Elevation", "Premium Construction", "Privacy", "Sophisticated Design"],
    status: "Completed",
    category: "Completed Project",
    overlayText: "EXCLUSIVE LIVING"
  }
];

// All Projects Timeline Data - Including all 15 projects
const allProjectsTimeline = [
  { name: "Sai Shraddha Apartment", units: "24", year: 2023, location: "Khutwad Nagar" },
  { name: "Vinayak Apartment", units: "10", year: 2023, location: "Makhamalabad" },
  { name: "Shree Ganesh Avenue", units: "45", year: 2022, location: "Gangapur Shivar" },
  { name: "Shree Ganesh Apartment", units: "25", year: 2021, location: "Gangapur Shivar" },
  { name: "Modakeshwar Apartment", units: "16", year: 2020, location: "Pathardi Wasan Nagar" },
  { name: "Siddhivinayak Rowhouses 2", units: "10", year: 2019, location: "Satpur" },
  { name: "Siddhivinayak Rowhouses 1", units: "12", year: 2018, location: "Satpur" },
  { name: "Nilanjan Shree", units: "50", year: 2017, location: "Gangapur Shivar" },
  { name: "Gajanan Niwas", units: "20", year: 2017, location: "Adgoan" },
  { name: "B Y Residency", units: "31", year: 2016, location: "Pathardi" },
  { name: "Datta Nivas", units: "12", year: 2015, location: "Pathardi Sadguru Nagar" },
  { name: "Swami Niwas", units: "24", year: 2013, location: "Makhamalbad" },
  { name: "Vasant Vihar", units: "16", year: 2012, location: "Gangapur Shivar" },
  { name: "Varad Vinayak 2", units: "10", year: 2011, location: "Dhruv Nagar" },
  { name: "Varad Vinayak 1", units: "36", year: 2010, location: "Kamatwade" }
];

// Milestones data removed since timeline is no longer used

const Milestones = () => {
  const scrollDirection = useContext(ScrollDirectionContext);
  // const [activeYear, setActiveYear] = useState(2025); // Commented out since we're not using year navigation
  const [selectedProject, setSelectedProject] = useState(null);
  const timelineRef = useRef(null);
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
                <FaArrowRight className="w-6 h-6 text-amber-600 rotate-45" />
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
            <div className="relative bg-gradient-to-r from-amber-50 to-gold/10 dark:from-amber-900/20 dark:to-gold/10 p-8">
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-amber-200 dark:bg-amber-800 rounded-lg transform rotate-12 opacity-30"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gold/20 dark:bg-gold/30 rounded-lg transform -rotate-12 opacity-20"></div>
              
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-amber-700 dark:text-amber-400 mb-2">
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
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg text-justify">
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
          animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
                className="w-16 h-16 bg-gradient-to-br from-amber-700 to-gold rounded-full flex items-center justify-center shadow-lg"
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
            
            <h1 className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-700 via-gold to-amber-600 bg-clip-text text-transparent mb-8">
              Our Journey of Excellence
            </h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={scrollDirection === 'down' ? undefined : { width: "200px" }}
              whileInView={scrollDirection === 'down' ? { width: "200px" } : false}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-amber-700 via-gold to-amber-600 mx-auto mb-8 rounded-full"
            ></motion.div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Celebrating milestones, achievements, and the trust of <span className="font-bold text-amber-700">500+ families</span> across <span className="font-bold text-gold">20+ years</span> of dedicated service
            </p>
            
            {/* Animated Stats Counter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
              whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center space-x-12"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={scrollDirection === 'down' ? undefined : { scale: 1 }}
                  whileInView={scrollDirection === 'down' ? { scale: 1 } : false}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-amber-700"
                >
                  500+
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Families</div>
            </div>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={scrollDirection === 'down' ? undefined : { scale: 1 }}
                  whileInView={scrollDirection === 'down' ? { scale: 1 } : false}
                  transition={{ duration: 0.5, delay: 1.7 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-gold"
                >
                  20+
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={scrollDirection === 'down' ? undefined : { scale: 1 }}
                  whileInView={scrollDirection === 'down' ? { scale: 1 } : false}
                  transition={{ duration: 0.5, delay: 1.9 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-orange-500"
                >
                  50+
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Delivered</div>
      </div>
            </motion.div>
          </div>
        </motion.div>


        {/* Projects Showcase - Original Theme with Creative Elements */}
        <div className="space-y-32">
          {completedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              id={`project-${project.id}`}
              initial={{ opacity: 0, y: 50 }}
              animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
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
                  className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-gold/20 rounded-lg transform rotate-12 opacity-60"
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
                  className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-gold/20 to-amber-500/20 rounded-lg transform -rotate-12 opacity-40"
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
                    animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
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
                      <FaArrowRight className="w-6 h-6 text-amber-700" />
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
                  className="w-20 h-20 bg-gradient-to-br from-amber-500/10 to-gold/10 rounded-lg mb-6 relative overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-gold/20"
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
                    className="text-2xl font-semibold text-amber-700 dark:text-amber-400 mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={scrollDirection === 'down' ? undefined : { opacity: 1, x: 0 }}
                    whileInView={scrollDirection === 'down' ? { opacity: 1, x: 0 } : false}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {project.category}
                  </motion.h3>
                  <motion.div 
                    className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4 relative"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={scrollDirection === 'down' ? undefined : { scale: 1, opacity: 1 }}
                    whileInView={scrollDirection === 'down' ? { scale: 1, opacity: 1 } : false}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  >
                    {project.number}
                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-gold"
                      initial={{ width: 0 }}
                      animate={scrollDirection === 'down' ? undefined : { width: "100%" }}
                      whileInView={scrollDirection === 'down' ? { width: "100%" } : false}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    ></motion.div>
    </motion.div>
                  <motion.h2 
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  >
                    {project.title}
                  </motion.h2>
                </div>
                
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-justify"
                  initial={{ opacity: 0, y: 20 }}
                  animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                >
                  {project.description}
                </motion.p>
                
                {/* Animated Project Details */}
        <motion.div 
                  className="grid grid-cols-2 gap-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
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
                        className="w-10 h-10 bg-gradient-to-br from-gold/10 to-amber-500/10 rounded-lg flex items-center justify-center group-hover/item:from-gold/20 group-hover/item:to-amber-500/20 transition-colors duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="w-5 h-5 text-gold" />
                      </motion.div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                        <p className="font-medium text-gray-900 dark:text-white group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400 transition-colors duration-300">{item.value}</p>
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
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-gold/10 rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
            ></motion.div>
                </motion.button>
          </div>
        </motion.div>
          ))}
        </div>

        {/* Horizontal Scrollable Timeline - All Projects */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 mb-32 px-4"
        >
          <div className="mb-12 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.6 }}
            >
              Our <span className="text-amber-700 font-bold">Complete Journey</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Scroll through our 20-year legacy of excellence
            </motion.p>
          </div>

          {/* Timeline Container */}
          <div className="relative w-full">
            {/* Timeline Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-gold to-amber-600 rounded-full pointer-events-none" />
            
            {/* Scrollable Timeline - Optimized for horizontal scroll */}
            <div 
              ref={timelineRef}
              className="overflow-x-auto scrollbar-hide pb-8 scroll-smooth"
              style={{ 
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}
            >
              <div className="flex gap-6 px-4 md:px-8 min-w-min">
                {allProjectsTimeline.map((project, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-80 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    {/* Timeline Point */}
                    <div className="flex flex-col items-center mb-6 relative">
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-700 to-gold flex items-center justify-center cursor-pointer shadow-lg relative z-10 group-hover:scale-125 transition-transform duration-300"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaBuilding className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>

                    {/* Project Card */}
                    <motion.div 
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group-hover:border-gold/50 relative overflow-hidden"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Card Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-amber-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10 space-y-4">
                        {/* Project Name */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-gold transition-colors duration-300">
                            {project.name}
                          </h3>
                        </div>

                        {/* Year Badge */}
                        <motion.div 
                          className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-gold/20 to-amber-700/20 text-gold font-semibold text-sm border border-gold/30"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.year}
                        </motion.div>

                        {/* Project Details */}
                        <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                          {/* Units */}
                          <div className="flex items-center space-x-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center group-hover/item:bg-gold/20 transition-colors">
                              <FaBuilding className="w-4 h-4 text-gold" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Units</p>
                              <p className="font-semibold text-gray-900 dark:text-white text-sm">{project.units}</p>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-center space-x-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-amber-700/10 flex items-center justify-center group-hover/item:bg-amber-700/20 transition-colors">
                              <FaMapMarkerAlt className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                              <p className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{project.location}</p>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <motion.div 
                          className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 dark:text-green-300 text-sm font-semibold text-center border border-green-500/30"
                          initial={{ opacity: 0 }}
                          animate={scrollDirection === 'down' ? undefined : { opacity: 1 }}
                    whileInView={scrollDirection === 'down' ? { opacity: 1 } : false}
                          transition={{ duration: 0.6 }}
                        >
                          ✓ Completed
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                onClick={() => {
                  timelineRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="p-3 rounded-full bg-gradient-to-br from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white shadow-xl transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title="Scroll left"
              >
                <FaChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => {
                  timelineRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="p-3 rounded-full bg-gradient-to-br from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white shadow-xl transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title="Scroll right"
              >
                <FaChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>


        {/* Contact CTA Section - Original Theme with Creative Elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="relative bg-gradient-to-r from-amber-700 to-gold rounded-2xl p-12 text-white overflow-hidden">
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
        /* Prevent body scroll when modal is open - DO NOT set position: fixed on body */
        body.modal-open {
          overflow: hidden !important;
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

        /* Hide scrollbar while maintaining scroll functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Milestones;