import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const projects = [
  {
    name: 'Shree Ganesh Heights',
    location: 'Nashik',
    status: 'Ongoing',
    image: '/assets/shree-ganesh-heights/gallery/front.jpeg',
    description: 'Premium residential development with modern amenities and excellent location advantages.',
    type: '2 & 3 BHK',
    units: '120 Units',
    area: '2.5 Acres',
    completionDate: '2024',
    route: '/ShreeGaneshHeights'
  },
  {
    name: 'Shree Ganesh Park',
    location: 'Nashik',
    status: 'Ongoing',
    image: '/assets/shree-ganesh-park/gallery/a-view.jpg',
    description: 'A premium residential development with multiple wings offering various apartment configurations.',
    type: '1 & 2 BHK',
    units: '150 Units',
    area: '3.0 Acres',
    completionDate: '2024',
    route: '/ShreeGaneshParkPhaseI'
  },
  {
    name: 'Shreeganesh Srushti',
    location: 'Nashik',
    status: 'Ongoing',
    image: '/assets/shree-ganesh-srushti/gallery/front.jpg',
    description: 'Latest residential development with contemporary design and all modern facilities.',
    type: '2 & 3 BHK',
    units: '100 Units',
    area: '2.0 Acres',
    completionDate: '2025',
    route: '/ShreeGaneshSrushti'
  },
  {
    name: 'Sai Shraddha Apartment',
    location: 'College Road, Nashik',
    status: 'Completed',
    image: '/assets/sai-shraddha-apartment/gallery/front.jpg',
    description: 'A beautifully designed residential complex offering comfortable living with all modern amenities and excellent connectivity.',
    type: '1 & 2 BHK',
    units: '80 Units',
    area: '1.8 Acres',
    completionDate: '2024',
    route: '/SaiShraddhaApartment'
  },
  {
    name: 'Vinayak Apartment',
    location: 'Pathardi Shivar, Nashik',
    status: 'Completed',
    image: '/assets/vinayak-apartment/gallery/1.jpg',
    description: 'Experience an elevated lifestyle of sophistication with 1 BHK Happy Homes crafted to enhance your everyday living.',
    type: '1 BHK',
    units: '40 Units',
    area: '0.5 Acres',
    completionDate: '2023',
    route: '/VinayakApartment'
  }
];

const ProjectsSection = () => {
  const navigate = useNavigate();

  const handleViewDetails = (route) => {
    navigate(route);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 to-transparent dark:from-primary-900/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our <span className="text-primary-600 dark:text-primary-400 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Exclusive Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated collection of exclusive residential projects, 
            each designed to offer the perfect blend of luxury, comfort, and modern living.
          </p>
        </motion.div>
        
        {/* Featured Projects Slider with Proper Margins */}
        <div className="featured-slider-container relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            spaceBetween={20}
            slidesPerView="auto"
            freeMode={true}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            centeredSlides={false}
            className="featured-slider"
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300 flex flex-col"
                >
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Ongoing' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-green-500 text-white'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                  
                  {/* Card Content with Flex Layout */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">{project.name}</h3>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{project.location}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                        <FaClock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{project.type}</span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3 leading-relaxed">{project.description}</p>
                      
                      {/* Project Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Units</span>
                          <span className="text-gray-600 dark:text-gray-400">{project.units}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Area</span>
                          <span className="text-gray-600 dark:text-gray-400">{project.area}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Button positioned at bottom */}
                    <div className="mt-auto">
                      <button 
                        onClick={() => handleViewDetails(project.route)}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Static positioned in margins */}
          <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 z-10 cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 z-10 cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom flex justify-center mt-6 space-x-2"></div>
        </div>
      </div>

      <style jsx="true" global="true">{`
        /* Featured Slider Container with Proper Margins */
        .featured-slider-container {
          padding: 0 40px;
          position: relative;
        }
        
        .featured-slider {
          display: flex;
          gap: 20px;
          padding: 0;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
        }
        
        .featured-slider::-webkit-scrollbar {
          display: none;
        }
        
        .featured-slider .swiper-slide {
          flex: 0 0 300px;
          scroll-snap-align: start;
          height: auto;
          display: flex;
          width: 300px !important;
        }
        
        .featured-slider .swiper-slide > div {
          width: 100%;
          display: flex;
          flex-direction: column;
          min-width: 300px;
          max-width: 300px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Enhanced card styling */
        .featured-slider .swiper-slide {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .featured-slider .swiper-slide:hover {
          transform: translateY(-8px);
        }
        
        /* Navigation buttons */
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
          transform: none !important;
        }
        
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
        }
        
        .swiper-button-prev-custom:after,
        .swiper-button-next-custom:after {
          display: none;
        }
        
        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none !important;
        }
        
        /* Pagination styling */
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 6px;
        }
        
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #ff2e84, #e91e63);
          transform: scale(1.3);
          box-shadow: 0 2px 8px rgba(255, 46, 132, 0.3);
        }
        
        /* Dark mode support */
        .dark .swiper-pagination-custom .swiper-pagination-bullet {
          background: #6b7280;
        }
        
        .dark .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #ff2e84, #e91e63);
        }
        
        .dark .swiper-button-prev-custom,
        .dark .swiper-button-next-custom {
          background: rgba(31, 41, 55, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f3f4f6;
        }
        
        .dark .swiper-button-prev-custom:hover,
        .dark .swiper-button-next-custom:hover {
          background: rgba(31, 41, 55, 1);
        }
        
        /* Card hover effects */
        .featured-slider .swiper-slide:hover .shadow-lg {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .featured-slider-container {
            padding: 0 20px;
          }
          
          .featured-slider .swiper-slide {
            flex: 0 0 280px;
            width: 280px !important;
          }
          
          .featured-slider .swiper-slide > div {
            min-width: 280px;
            max-width: 280px;
          }
          
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            display: none;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1023px) {
          .featured-slider-container {
            padding: 0 30px;
          }
          
          .featured-slider .swiper-slide {
            flex: 0 0 320px;
            width: 320px !important;
          }
          
          .featured-slider .swiper-slide > div {
            min-width: 320px;
            max-width: 320px;
          }
        }
        
        @media (min-width: 1024px) {
          .featured-slider-container {
            padding: 0 40px;
          }
          
          .featured-slider .swiper-slide {
            flex: 0 0 350px;
            width: 350px !important;
          }
          
          .featured-slider .swiper-slide > div {
            min-width: 350px;
            max-width: 350px;
          }
        }
        
        @media (min-width: 1280px) {
          .featured-slider-container {
            padding: 0 50px;
          }
          
          .featured-slider .swiper-slide {
            flex: 0 0 380px;
            width: 380px !important;
          }
          
          .featured-slider .swiper-slide > div {
            min-width: 380px;
            max-width: 380px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection; 