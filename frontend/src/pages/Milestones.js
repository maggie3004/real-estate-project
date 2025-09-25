import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { FaBuilding, FaUsers, FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const completedProjects = [
  {
    id: 1,
    title: "Sai Shraddha Apartment",
    description: "A beautifully designed residential complex offering comfortable living with all modern amenities and excellent connectivity.",
    location: "College Road, Nashik",
    completionDate: "2024",
    units: "80 Units",
    area: "1.8 Acres",
    images: [
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-23.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-24 2.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-24.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-38.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-39 2.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-39.jpg",
      "/assets/sai-shraddha-apartment/gallery/PHOTO-2023-05-31-18-16-40.jpg"
    ],
    amenities: ["Garden", "Security", "Parking", "Power Backup", "Water Supply", "Maintenance"],
    features: ["1BHK & 2BHK Apartments", "Quality Construction", "Good Ventilation", "Nearby Schools", "Market Access"],
    status: "Completed"
  },
  {
    id: 2,
    title: "Shree Ganesh Heights",
    description: "Premium residential development with modern amenities and excellent location advantages.",
    location: "Nashik",
    completionDate: "2024",
    units: "120 Units",
    area: "2.5 Acres",
    images: [
      "/assets/shree-ganesh-heights/gallery/PHOTO-2024-07-24-14-16-26.jpg",
      "/assets/shree-ganesh-heights/gallery/PHOTO-2024-08-07-21-22-54.jpg",
      "/assets/shree-ganesh-heights/gallery/PHOTO-2024-08-18-16-26-07.jpg"
    ],
    amenities: ["Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Garden"],
    features: ["2BHK & 3BHK Apartments", "Quality Construction", "Good Ventilation", "Modern Design"],
    status: "Completed"
  },
  {
    id: 3,
    title: "Shree Ganesh Park",
    description: "A premium residential development with multiple wings offering various apartment configurations.",
    location: "Nashik",
    completionDate: "2024",
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
    status: "Completed"
  },
  {
    id: 4,
    title: "Shreeganesh Srushti",
    description: "Latest residential development with contemporary design and all modern facilities.",
    location: "Nashik",
    completionDate: "2025",
    units: "100 Units",
    area: "2.0 Acres",
    images: [
      "/assets/shree-ganesh-srushti/gallery/PHOTO-2025-07-07-11-48-19.jpg",
      "/assets/shree-ganesh-srushti/gallery/PHOTO-2025-07-23-11-14-21.jpg",
      "/assets/shree-ganesh-srushti/gallery/PHOTO-2025-07-30-13-43-35.jpg",
      "/assets/shree-ganesh-srushti/gallery/WhatsApp Image 2025-07-22 at 13.17.15 (1).jpeg",
      "/assets/shree-ganesh-srushti/gallery/WhatsApp Image 2025-07-22 at 13.17.15 (2).jpeg",
      "/assets/shree-ganesh-srushti/gallery/WhatsApp Image 2025-07-22 at 13.17.15.jpeg",
      "/assets/shree-ganesh-srushti/gallery/WhatsApp Image 2025-07-22 at 13.17.16.jpeg"
    ],
    amenities: ["Security", "Parking", "Power Backup", "Water Supply", "Maintenance", "Garden", "Gym"],
    features: ["2BHK & 3BHK Apartments", "Contemporary Design", "Quality Construction", "Modern Amenities"],
    status: "Completed"
  }
];

// Milestones data removed since timeline is no longer used

const Milestones = () => {
  // const [activeYear, setActiveYear] = useState(2025); // Commented out since we're not using year navigation
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef(null);
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

  const openImagePopup = useCallback((image, title, currentIndex, totalImages, allImages) => {
    setSelectedImage({
      src: image,
      title: title,
      currentIndex: currentIndex,
      totalImages: totalImages,
      allImages: allImages
    });
    // Prevent body scrolling when image popup is open
    document.body.classList.add('image-popup-open');
    document.body.style.overflow = 'hidden';
  }, []);

  const closeImagePopup = useCallback(() => {
    // Clear any pending navigation timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
    
    setSelectedImage(null);
    setIsNavigating(false);
    // Restore body scrolling when image popup is closed
    document.body.classList.remove('image-popup-open');
    document.body.style.overflow = 'unset';
  }, []);

  const navigateImage = useCallback((direction) => {
    console.log('navigateImage called with direction:', direction);
    console.log('selectedImage:', selectedImage);
    
    if (!selectedImage) {
      console.log('No selectedImage, returning');
      return;
    }
    
    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    
    setIsNavigating(true);
    
    // Update image immediately
    setSelectedImage(prevImage => {
      if (!prevImage) {
        console.log('No prevImage, returning');
        return prevImage;
      }
      
      const { currentIndex, allImages, title, totalImages } = prevImage;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
      }
      
      console.log('Navigating from', currentIndex, 'to', newIndex);
      
      return {
        src: allImages[newIndex],
        title: title,
        currentIndex: newIndex,
        totalImages: totalImages,
        allImages: allImages
      };
    });
    
    // Reset navigation flag after a short delay
    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
      navigationTimeoutRef.current = null;
    }, 200);
  }, [selectedImage]);

  // Image navigation handled inside memoized carousel component

  // Keyboard navigation: close modal on Escape, navigate images with arrows
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (selectedImage) {
          closeImagePopup();
        } else if (selectedProject) {
          closeProjectModal();
        }
      } else if (selectedImage && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
        navigateImage(event.key === 'ArrowRight' ? 'next' : 'prev');
      }
    };

    if (selectedProject || selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedProject, selectedImage, closeProjectModal, closeImagePopup, navigateImage]);

  // Cleanup: restore body scroll when component unmounts
  useEffect(() => {
    return () => {
      // Clear any pending navigation timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      
      document.body.classList.remove('modal-open');
      document.body.classList.remove('image-popup-open');
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

  // Memoized Image Carousel so only image area re-renders
  const ProjectImageCarousel = memo(function ProjectImageCarousel({ images, title, onImageClick }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = useCallback(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const handlePrev = useCallback(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    // Keyboard navigation scoped to carousel when modal focused
    useEffect(() => {
      const onKey = (e) => {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }, [handlePrev, handleNext]);

    return (
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-xl">
          <div 
            className="flex h-80 w-full carousel-sliding-container"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 h-full carousel-slide">
                <img
                  src={image}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-full object-cover carousel-image cursor-pointer hover:opacity-90 transition-opacity duration-200"
                  onError={(e) => { e.target.src = '/hero-building.jpg'; }}
                  onClick={() => onImageClick(image, title, index, images.length, images)}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="carousel-button absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-2 rounded-full shadow-lg z-30 backdrop-blur-sm"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="carousel-button absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-2 rounded-full shadow-lg z-30 backdrop-blur-sm"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Image Label */}
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {getImageLabel(images[currentIndex], currentIndex)}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {title} - Image {currentIndex + 1} of {images.length}
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
    );
  });

  // Project Modal Component
  const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <FaTimes className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image Carousel */}
                  <ProjectImageCarousel 
                    images={project.images} 
                    title={project.title} 
                    onImageClick={openImagePopup}
                  />

                  {/* Project Details */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Project Description
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Project Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="w-5 h-5 text-gold" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium text-gray-900 dark:text-white">{project.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaCalendarAlt className="w-5 h-5 text-gold" />
                        <div>
                          <p className="text-sm text-gray-500">Completed</p>
                          <p className="font-medium text-gray-900 dark:text-white">{project.completionDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaBuilding className="w-5 h-5 text-gold" />
                        <div>
                          <p className="text-sm text-gray-500">Units</p>
                          <p className="font-medium text-gray-900 dark:text-white">{project.units}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaUsers className="w-5 h-5 text-gold" />
                        <div>
                          <p className="text-sm text-gray-500">Area</p>
                          <p className="font-medium text-gray-900 dark:text-white">{project.area}</p>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Amenities
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="bg-gold bg-opacity-10 text-gold px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Key Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium"
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

  // Image Popup Component
  const ImagePopup = ({ image, isOpen, onClose, onNavigate, isNavigating }) => {
    if (!isOpen || !image) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
              {image.currentIndex + 1} / {image.totalImages}
            </div>

            {/* Navigation Buttons */}
            {image.totalImages > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={() => {
                    console.log('Previous button clicked');
                    onNavigate('prev');
                  }}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 ${
                    isNavigating ? 'opacity-70' : ''
                  }`}
                >
                  <FaChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Button */}
                <button
                  onClick={() => {
                    console.log('Next button clicked');
                    onNavigate('next');
                  }}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 ${
                    isNavigating ? 'opacity-70' : ''
                  }`}
                >
                  <FaChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Image */}
            <img
              src={image.src}
              alt={image.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onError={(e) => { e.target.src = '/hero-building.jpg'; }}
            />

            {/* Image Title */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-center">
              <h3 className="text-lg font-semibold">{image.title}</h3>
              <p className="text-sm opacity-90">
                {getImageLabel(image.src, image.currentIndex)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Project Card Component
  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer group transition-all duration-200 hover:shadow-xl"
      onClick={() => openProjectModal(project)}
    >
      {/* Project Image Slider */}
      <div className="relative h-64 overflow-hidden">
        {project.images.length > 1 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: `.swiper-button-next-${project.id}`,
              prevEl: `.swiper-button-prev-${project.id}`,
            }}
            pagination={{
              clickable: true,
              el: `.swiper-pagination-${project.id}`,
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom'
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            className="milestone-card-swiper h-full"
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full">
                  <img
                    src={image}
                    alt={`${project.title} - ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = '/hero-building.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="relative h-full">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => { e.target.src = '/hero-building.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {project.status}
          </span>
        </div>

        {/* Image Counter */}
        {project.images.length > 1 && (
          <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
            {project.images.length} photos
          </div>
        )}

        {/* Navigation Buttons */}
        {project.images.length > 1 && (
          <>
            <div className={`swiper-button-prev-${project.id} absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-1.5 rounded-full shadow-lg z-20 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100`}>
              <FaChevronLeft className="w-3 h-3" />
            </div>
            <div className={`swiper-button-next-${project.id} absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-1.5 rounded-full shadow-lg z-20 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100`}>
              <FaChevronRight className="w-3 h-3" />
            </div>
          </>
        )}

        {/* Pagination */}
        {project.images.length > 1 && (
          <div className={`swiper-pagination-${project.id} absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10`}></div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
          <div className="bg-white bg-opacity-90 rounded-full p-4">
            <FaArrowRight className="w-6 h-6 text-gold" />
          </div>
        </div>
      </div>
            
      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gold transition-colors">
          {project.title}
            </h3>
            
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Project Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gold" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaCalendarAlt className="w-4 h-4 mr-2 text-gold" />
            <span>Completed: {project.completionDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaBuilding className="w-4 h-4 mr-2 text-gold" />
            <span>{project.units} • {project.area}</span>
          </div>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.amenities.slice(0, 3).map((amenity, idx) => (
            <span
              key={idx}
              className="bg-gold bg-opacity-10 text-gold px-2 py-1 rounded-full text-xs font-medium"
            >
              {amenity}
            </span>
          ))}
          {project.amenities.length > 3 && (
            <span className="text-xs text-gray-500">
              +{project.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Click to View More */}
        <div className="text-center">
          <span className="text-gold text-sm font-medium group-hover:underline">
            Click to view details
          </span>
        </div>
      </div>
    </motion.div>
  );

  // AchievementCard component removed since timeline is no longer used

  return (
    <section className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-[#181818] dark:text-white transition-colors duration-300">
      <Helmet>
        <title>Milestones & Achievements - Ganesh Yeole Builders | Our Journey of Excellence</title>
        <meta name="description" content="Explore our journey of excellence through key milestones and achievements from 2023-2025. Discover how we've grown and succeeded in real estate development." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gradient-to-br from-gold/10 via-gray-500/10 to-green-500/10 rounded-full blur-3xl"></div>
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
          </div>
        </motion.div>


        {/* Completed Projects Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Completed Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our successfully delivered projects that have created homes for hundreds of families
            </p>
                </div>

          {/* Projects Grid - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {completedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
                  />
                ))}
              </div>
        </motion.div>

        {/* Timeline Section Removed */}
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeProjectModal}
      />

      {/* Image Popup */}
      <ImagePopup 
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={closeImagePopup}
        onNavigate={navigateImage}
        isNavigating={isNavigating}
      />

      {/* Custom Styles for Milestone Card Swiper and Modal */}
      <style jsx="true" global="true">{`
        /* Prevent body scroll when modal is open */
        body.modal-open,
        body.image-popup-open {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
        }
        
        /* Milestone Card Swiper Styles */
        .milestone-card-swiper {
          border-radius: 0;
        }
        
        .milestone-card-swiper .swiper-slide {
          height: 100%;
        }
        
        .swiper-pagination-bullet-custom {
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active-custom {
          background: #ffd700;
          transform: scale(1.2);
        }
        
        .swiper-button-prev-1:after,
        .swiper-button-next-1:after,
        .swiper-button-prev-2:after,
        .swiper-button-next-2:after,
        .swiper-button-prev-3:after,
        .swiper-button-next-3:after,
        .swiper-button-prev-4:after,
        .swiper-button-next-4:after,
        .swiper-button-prev-5:after,
        .swiper-button-next-5:after {
          display: none;
        }
        
        .swiper-button-prev-1.swiper-button-disabled,
        .swiper-button-next-1.swiper-button-disabled,
        .swiper-button-prev-2.swiper-button-disabled,
        .swiper-button-next-2.swiper-button-disabled,
        .swiper-button-prev-3.swiper-button-disabled,
        .swiper-button-next-3.swiper-button-disabled,
        .swiper-button-prev-4.swiper-button-disabled,
        .swiper-button-next-4.swiper-button-disabled,
        .swiper-button-prev-5.swiper-button-disabled,
        .swiper-button-next-5.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        /* Modal positioning fixes */
        .project-modal-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 50 !important;
        }
        
        .project-modal-content {
          position: relative !important;
          overflow-y: auto !important;
        }
      `}</style>
    </section>
  );
};

export default Milestones;