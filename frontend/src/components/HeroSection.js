import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSwipe } from '../hooks/useSwipe';

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

  const nextSlide = useCallback(() => {
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    // Resume auto-play after 4 seconds for Ganesh Housing style
    setTimeout(() => setIsAutoPlaying(true), 4000);
  }, [carouselData.length]);

  const prevSlide = useCallback(() => {
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
    // Resume auto-play after 4 seconds for Ganesh Housing style
    setTimeout(() => setIsAutoPlaying(true), 4000);
  }, [carouselData.length]);

  const goToSlide = useCallback((index) => {
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    setCurrentIndex(index);
    // Resume auto-play after 4 seconds for Ganesh Housing style
    setTimeout(() => setIsAutoPlaying(true), 4000);
  }, []);

  // Swipe support
  const { elementRef } = useSwipe({
    onSwipeLeft: () => nextSlide(),
    onSwipeRight: () => prevSlide(),
    minSwipeDistance: 50
  });

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 5000); // Change slide every 5 seconds for Ganesh Housing style smoothness

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselData.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case ' ':
          e.preventDefault();
          setIsAutoPlaying(prev => !prev);
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(carouselData.length - 1);
          break;
        default:
          break;
      }
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      element.setAttribute('tabindex', '0');
      element.setAttribute('role', 'region');
      element.setAttribute('aria-label', 'Image carousel');
    }

    return () => {
      if (element) {
        element.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [carouselData.length, elementRef, nextSlide, prevSlide, goToSlide]);

  return (
    <motion.section
      ref={elementRef}
      id="home"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative h-screen overflow-hidden w-full touch-pan-y"
    >
             {/* Carousel Background */}
       <div className="absolute inset-0 overflow-hidden">
         <div 
           className="flex h-full w-full carousel-sliding-container"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
         >
           {carouselData.map((slide, index) => (
             <div key={slide.id} className="w-full flex-shrink-0 h-full relative carousel-slide">
               <img 
                 src={slide.image}
                 alt={slide.title}
                 className={`carousel-image w-full h-full object-center ${
                   slide.id === 1 ? 'object-cover' : 'sm:object-contain md:object-cover lg:object-cover'
                 }`}
                 style={{
                   minHeight: '100vh',
                   minWidth: '100vw',
                   objectPosition: slide.id === 1 ? 'center 30%' : 'center center'
                 }}
               />
               
                               {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 dark:from-black/30 dark:via-black/40 dark:to-black/60"></div>
               
                                                               {/* Slide-specific content */}
                 <div className="absolute top-28 sm:top-32 left-8 sm:left-12 z-10 max-w-2xl">
                   <motion.h2
                     initial={{ opacity: 0, x: -30 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                     className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white dark:text-gray-100 mb-4 leading-tight drop-shadow-lg text-left"
                   >
                     {slide.title}
                   </motion.h2>
                   <motion.p
                     initial={{ opacity: 0, x: -30 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: 0.4 }}
                     className="text-base sm:text-lg md:text-xl text-gray-100 dark:text-gray-200 leading-relaxed drop-shadow-md text-left"
                   >
                     {slide.subtitle}
                   </motion.p>
                 </div>


             </div>
           ))}
         </div>
       </div>

                                                       

             {/* Navigation Arrows */}
               <button
          onClick={prevSlide}
          className="carousel-button absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-2 sm:p-3 rounded-full shadow-lg z-30 backdrop-blur-sm"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="carousel-button absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-2 sm:p-3 rounded-full shadow-lg z-30 backdrop-blur-sm"
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>


               {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-dot w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                index === currentIndex 
                  ? 'bg-yellow-500 active' 
                  : 'bg-white/50 hover:bg-white/70 dark:bg-gray-300/50 dark:hover:bg-gray-200/70'
              }`}
            />
          ))}
        </div>
    </motion.section>
  );
};

export default HeroSection; 