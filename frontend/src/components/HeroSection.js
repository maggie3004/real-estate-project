import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Carousel data with 3 high-quality building images
  const carouselData = [
    {
      id: 1,
      image: '/hero-building.jpg',
      title: 'Luxury Living Redefined',
      subtitle: 'Premium properties with world-class amenities'
    },
    {
      id: 2,
      image: '/assets/shree-ganesh-heights/gallery/1.jpeg',
      title: 'Shree Ganesh Heights',
      subtitle: 'Excellence in every detail'
    },
    {
      id: 3,
      image: '/assets/sai-shraddha-apartment/gallery/1.jpg',
      title: 'Sai Shraddha Apartment',
      subtitle: 'Creating homes that last generations'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselData.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden w-full"
    >
             {/* Carousel Background */}
       <div className="absolute inset-0 overflow-hidden">
         <div 
           className="flex transition-transform duration-1000 ease-in-out h-full w-full"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
         >
           {carouselData.map((slide, index) => (
             <div key={slide.id} className="w-full flex-shrink-0 h-full relative">
               <img 
                 src={slide.image}
                 alt={slide.title}
                 className="w-full h-full object-cover object-center"
                 style={{
                   minHeight: '100vh',
                   minWidth: '100vw'
                 }}
               />
               
                               {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-60"></div>
               
                                                               {/* Slide-specific content */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
                                       <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white dark:text-gray-100 mb-3 leading-tight"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-base sm:text-lg md:text-xl text-gray-200 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
                    >
                      {slide.subtitle}
                    </motion.p>
                 </div>

                 {/* CTA Buttons - Bottom of each slide */}
                 <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-10">
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.6 }}
                     className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                   >
                                           <a
                        href="/Shri Ganesh Heights.pdf"
                        download
                        className="bg-yellow-500 hover:bg-white dark:hover:bg-gray-800 text-white hover:text-yellow-500 dark:hover:text-yellow-400 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-500 scale-100 hover:scale-105 focus:scale-105 text-xs sm:text-sm"
                      >
                        Download Brochure
                      </a>
                      <a
                        href="#contact"
                        className="bg-yellow-500 hover:bg-white dark:hover:bg-gray-800 text-white hover:text-yellow-500 dark:hover:text-yellow-400 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-500 scale-100 hover:scale-105 focus:scale-105 text-xs sm:text-sm"
                      >
                        Enquire Now
                      </a>
                   </motion.div>
                 </div>
             </div>
           ))}
         </div>
       </div>

                                                       

             {/* Navigation Arrows */}
               <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-30"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-30"
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 px-3 py-2 rounded-lg shadow-lg transition-all duration-200 text-xs sm:text-sm z-30"
        >
          {isAutoPlaying ? 'Pause' : 'Play'}
        </button>

               {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-yellow-500 scale-125' 
                  : 'bg-white/50 hover:bg-white/70 dark:bg-gray-300/50 dark:hover:bg-gray-200/70'
              }`}
            />
          ))}
        </div>
    </motion.section>
  );
};

export default HeroSection; 