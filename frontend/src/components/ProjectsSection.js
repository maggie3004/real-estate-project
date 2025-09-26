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
    name: 'Sai Shraddha Apartment',
    location: 'College Road, Nashik',
    status: 'Completed',
    image: '/assets/sai-shraddha-apartment/gallery/front.jpg',
    description: 'A beautifully designed residential complex offering comfortable living with all modern amenities and excellent connectivity.',
    price: 'Contact for Price',
    type: '1 & 2 BHK',
    units: '80 Units',
    area: '1.8 Acres',
    completionDate: '2024',
    route: '/property/1'
  },
  {
    name: 'Shree Ganesh Heights',
    location: 'Nashik',
    status: 'Completed',
    image: '/assets/shree-ganesh-heights/gallery/front.jpeg',
    description: 'Premium residential development with modern amenities and excellent location advantages.',
    price: 'Contact for Price',
    type: '2 & 3 BHK',
    units: '120 Units',
    area: '2.5 Acres',
    completionDate: '2024',
    route: '/property/2'
  },
  {
    name: 'Shree Ganesh Park',
    location: 'Nashik',
    status: 'Completed',
    image: '/assets/shree-ganesh-park/gallery/a-view.jpg',
    description: 'A premium residential development with multiple wings offering various apartment configurations.',
    price: 'Contact for Price',
    type: '1 & 2 BHK',
    units: '150 Units',
    area: '3.0 Acres',
    completionDate: '2024',
    route: '/property/3'
  },
  {
    name: 'Shreeganesh Srushti',
    location: 'Nashik',
    status: 'Completed',
    image: '/assets/shree-ganesh-srushti/gallery/front.jpg',
    description: 'Latest residential development with contemporary design and all modern facilities.',
    price: 'Contact for Price',
    type: '2 & 3 BHK',
    units: '100 Units',
    area: '2.0 Acres',
    completionDate: '2025',
    route: '/property/4'
  }
];

const ProjectsSection = () => {
  const navigate = useNavigate();

  const handleViewDetails = (route) => {
    navigate(route);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our premium residential projects designed for modern living
          </p>
        </div>
        
        {/* Swiper Implementation */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            spaceBetween={16}
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
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="projects-swiper"
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Ongoing' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-green-500 text-white'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                      <FaClock className="w-4 h-4 mr-2" />
                      {project.type}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.description}</p>
                    
                    {/* Project Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="font-medium mr-1">Units:</span>
                        <span>{project.units}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="font-medium mr-1">Area:</span>
                        <span>{project.area}</span>
                      </div>
                    </div>
                    
                    <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mb-4">{project.price}</div>
                    <button 
                      onClick={() => handleViewDetails(project.route)}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 p-2 md:p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 z-10 hover:scale-110 cursor-pointer">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 p-2 md:p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 z-10 hover:scale-110 cursor-pointer">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom flex justify-center mt-6 space-x-2"></div>
        </div>
      </div>

      <style jsx="true" global="true">{`
        .projects-swiper {
          padding: 0 0 60px 0;
        }
        
        .projects-swiper .swiper-slide {
          height: auto;
        }
        
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #ff2e84;
          transform: scale(1.2);
        }
        
        .swiper-button-prev-custom:after,
        .swiper-button-next-custom:after {
          display: none;
        }
        
        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        /* Dark mode support */
        .dark .swiper-pagination-custom .swiper-pagination-bullet {
          background: #6b7280;
        }
        
        .dark .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #ff2e84;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection; 