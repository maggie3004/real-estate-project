import React, { useState, useEffect, useCallback, memo } from 'react';
import { Helmet } from 'react-helmet';
import { FaBuilding, FaUsers, FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

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
      "/assets/sai-shraddha-apartment/IMG-20250722-WA0066.jpg",
      "/assets/sai-shraddha-apartment/IMG-20250722-WA0067.jpg",
      "/assets/sai-shraddha-apartment/IMG-20250722-WA0068.jpg",
      "/assets/sai-shraddha-apartment/IMG-20250722-WA0069.jpg",
      "/assets/sai-shraddha-apartment/IMG-20250722-WA0070.jpg"
    ],
    amenities: ["Garden", "Security", "Parking", "Power Backup", "Water Supply", "Maintenance"],
    features: ["1BHK & 2BHK Apartments", "Quality Construction", "Good Ventilation", "Nearby Schools", "Market Access"],
    status: "Completed"
  },
  {
    id: 2,
    title: "Vinayak Apartment",
    description: "Comfortable living spaces with essential amenities and excellent location advantages.",
    location: "Panchavati, Nashik",
    completionDate: "2024",
    units: "60 Units",
    area: "1.5 Acres",
    images: [
      "/hero-building.jpg"
    ],
    amenities: ["Security", "Parking", "Power Backup", "Water Supply", "Maintenance"],
    features: ["1BHK & 2BHK Apartments", "Quality Construction", "Good Ventilation"],
    status: "Completed"
  },
  {
    id: 3,
    title: "Shree Ganesh Avenue",
    description: "A premium residential development delivered with quality construction.",
    location: "Nashik",
    completionDate: "2023",
    units: "--",
    area: "--",
    images: [
      "/hero-building.jpg"
    ],
    amenities: ["Parking", "Security"],
    features: ["Quality Construction"],
    status: "Completed"
  },
  {
    id: 4,
    title: "Shree Ganesh Apartment",
    description: "Residential apartments completed with essential amenities.",
    location: "Nashik",
    completionDate: "2022",
    units: "--",
    area: "--",
    images: [
      "/hero-building.jpg"
    ],
    amenities: ["Security", "Water Supply"],
    features: ["Good Ventilation"],
    status: "Completed"
  },
  {
    id: 5,
    title: "Modakeshwar Apartment",
    description: "Completed residential project offering comfortable homes.",
    location: "Nashik",
    completionDate: "2021",
    units: "--",
    area: "--",
    images: [
      "/hero-building.jpg"
    ],
    amenities: ["Parking", "Security"],
    features: ["Quality Construction"],
    status: "Completed"
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
  };

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Image navigation handled inside memoized carousel component

  // Keyboard navigation: close modal on Escape only (carousel handles arrows)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedProject) return;
      if (event.key === 'Escape') {
        closeProjectModal();
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedProject, closeProjectModal]);

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
          <div 
            className="flex h-80 w-full carousel-sliding-container"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 h-full carousel-slide">
                <img
                  src={image}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-full object-cover carousel-image"
                  onError={(e) => { e.target.src = '/hero-building.jpg'; }}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
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

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image Carousel */}
                  <ProjectImageCarousel images={project.images} title={project.title} />

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
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
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
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {project.status}
                </span>
              </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              <div className="w-96 h-96 bg-gradient-to-br from-gold/10 via-blue-500/10 to-green-500/10 rounded-full blur-3xl"></div>
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

        {/* Year Navigation - Commented Out */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <div className="flex space-x-4 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg">
            {milestones.map((yearData) => (
              <button
                key={yearData.year}
                onClick={() => setActiveYear(yearData.year)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeYear === yearData.year
                    ? 'bg-gradient-to-r from-gold to-orange-500 text-white shadow-lg scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {yearData.year}
              </button>
            ))}
          </div>
        </motion.div> */}

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
    </section>
  );
};

export default Milestones;