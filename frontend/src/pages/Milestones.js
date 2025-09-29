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
    title: "Shreeganesh Srushti",
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

  // Memoized Image Carousel so only image area re-renders
  const ProjectImageCarousel = memo(function ProjectImageCarousel({ images, title }) {
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
                    className="w-full h-full object-cover carousel-image"
                    onError={(e) => { e.target.src = '/hero-building.jpg'; }}
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

  // Project Modal Component - Vaastu Group Style
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
            className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-h-full relative modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Vaastu Group Style */}
            <div className="relative bg-gradient-to-r from-amber-50 to-amber-100 p-8">
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-amber-200 rounded-lg transform rotate-12 opacity-30"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-amber-300 rounded-lg transform -rotate-12 opacity-20"></div>
              
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-amber-600 mb-2 font-serif">
                    {project.category}
                  </h3>
                  <h2 className="text-4xl font-bold text-gray-900 font-serif">
                {project.title}
              </h2>
                </div>
              <button
                onClick={onClose}
                  className="p-3 hover:bg-white/50 rounded-full transition-colors"
              >
                  <FaTimes className="w-6 h-6 text-gray-600" />
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 font-serif">
                        Project Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {project.description}
                      </p>
                    </div>

                    {/* Project Info */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                          <FaMapMarkerAlt className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-semibold text-gray-900">{project.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                          <FaCalendarAlt className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Completion</p>
                          <p className="font-semibold text-gray-900">{project.completionDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                          <FaBuilding className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Units</p>
                          <p className="font-semibold text-gray-900">{project.units}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                          <FaUsers className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Area</p>
                          <p className="font-semibold text-gray-900">{project.area}</p>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 font-serif">
                        Amenities
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 font-serif">
                        Key Features
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
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
    <section className="min-h-screen pt-24 pb-12 bg-white text-gray-900">
      <Helmet>
        <title>Our Journey of Excellence - Ganesh Yeole Builders | Milestones & Achievements</title>
        <meta name="description" content="Explore our journey of excellence through key milestones and achievements. Discover our completed and ongoing projects that have created homes for hundreds of families." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section - Vaastu Group Style */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="relative">
            {/* Decorative Beige Block */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-amber-50 rounded-lg transform rotate-12 opacity-60"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-amber-100 rounded-lg transform -rotate-12 opacity-40"></div>
            
            <h1 className="relative text-5xl md:text-6xl font-bold text-gray-900 mb-8 font-serif">
              Our Journey of <span className="text-amber-600">Excellence</span>
            </h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"
            ></motion.div>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Celebrating milestones, achievements, and the trust of <span className="font-bold text-amber-600">500+ families</span> across <span className="font-bold text-gray-800">16+ years</span> of dedicated service
            </p>
          </div>
        </motion.div>

        {/* Projects Showcase - Vaastu Group Pattern */}
        <div className="space-y-32">
          {completedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'
              }`}
            >
              {/* Left Side - Image (or Right Side for alternating) */}
              <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} relative`}>
                {/* Decorative Beige Block */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-50 rounded-lg transform rotate-12 opacity-60"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-amber-100 rounded-lg transform -rotate-12 opacity-40"></div>
                
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.src = '/hero-building.jpg'; }}
                  />
                  
                  {/* Overlay Text */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm font-semibold tracking-wider opacity-90">
                      {project.overlayText}
                    </p>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      project.status === 'Completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-amber-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - Content (or Left Side for alternating) */}
              <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                {/* Decorative Beige Block */}
                <div className="w-20 h-20 bg-amber-50 rounded-lg mb-6"></div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-amber-600 mb-2 font-serif">
                    {project.category}
                  </h3>
                  <div className="text-6xl font-bold text-gray-300 mb-4">
                    {project.number}
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
                    {project.title}
                  </h2>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>
                
                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{project.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Completion</p>
                      <p className="font-medium text-gray-900">{project.completionDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaBuilding className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Units</p>
                      <p className="font-medium text-gray-900">{project.units}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaUsers className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-medium text-gray-900">{project.area}</p>
                    </div>
                  </div>
                </div>
                
                {/* Read More Button */}
                <button
                  onClick={() => openProjectModal(project)}
                  className="inline-flex items-center space-x-2 text-gray-900 hover:text-amber-600 transition-colors duration-300 group"
                >
                  <span className="font-medium underline">Read more</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA Section - Vaastu Group Style */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="relative bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-12 text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-6 right-6 w-24 h-24 bg-white/10 rounded-lg transform rotate-12 opacity-30"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/10 rounded-lg transform -rotate-12 opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                Ready to Be Part of Our Next Milestone?
            </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Join thousands of satisfied homeowners who trusted us with their dreams. 
                Let's create something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 text-lg">
                  Explore Our Projects
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transition-colors duration-300 text-lg">
                  Contact Us
                </button>
              </div>
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