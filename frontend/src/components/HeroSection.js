import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSection = () => {
  // Swiper ref for manual navigation control
  const swiperRef = useRef(null);

  // Navigation handlers
  const handlePrevSlide = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  }, []);

  const handleNextSlide = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  }, []);

  // Preload images for better performance
  React.useEffect(() => {
    const imageUrls = [
      '/assets/shree-ganesh-heights/gallery/night-front.jpg',
      '/assets/shree-ganesh-park/gallery/ter-view.jpg',
      '/frontend/public/hero-building.jpg'
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Keyboard navigation support
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevSlide();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevSlide, handleNextSlide]);

  // Carousel data with 3 high-quality building images
  const carouselData = [
    {
      id: 1,
      image: '/assets/shree-ganesh-heights/gallery/night-front.jpg',
      title: 'Luxury Living Redefined',
      subtitle: 'Premium properties with world-class amenities'
    },
    {
      id: 2,
      image: '/frontend/public/hero-building.jpg',
      title: 'Shree Ganesh Heights',
      subtitle: 'Excellence in every detail'
    },
    {
      id: 3,
      image: '/assets/shree-ganesh-park/gallery/ter-view.jpg',
      title: 'Sai Shraddha Apartment',
      subtitle: 'Creating homes that last generations'
    }
  ];

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative h-screen overflow-hidden w-full"
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
          el: '.hero-swiper-pagination',
          bulletClass: 'hero-swiper-pagination-bullet',
          bulletActiveClass: 'hero-swiper-pagination-bullet-active'
        }}
        loop={true}
        className="hero-swiper h-full w-full"
      >
        {carouselData.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            <div className="relative h-full w-full bg-gray-900 flex items-center justify-center">
              <img 
                src={slide.image}
                alt={slide.title}
                className="hero-image"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  e.target.src = '/hero-building.jpg';
                }}
              />
              
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 dark:from-black/30 dark:via-black/40 dark:to-black/60"></div>
              
              {/* Slide-specific content */}
              <div className="absolute top-24 sm:top-28 md:top-32 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 z-10 max-w-2xl">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white dark:text-gray-100 mb-2 sm:mb-4 leading-tight drop-shadow-lg text-left"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg text-gray-100 dark:text-gray-200 mb-4 sm:mb-6 leading-relaxed drop-shadow-md text-left"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button 
        onClick={handlePrevSlide}
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg z-30 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={handleNextSlide}
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg z-30 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="hero-swiper-pagination absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-30"></div>

      {/* Hero Carousel Styles */}
      <style jsx global>{`
        .hero-swiper {
          height: 100vh;
          width: 100%;
        }
        
        .hero-swiper .swiper-slide {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        .hero-swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          border-radius: 6px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .hero-swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
        }
        
        .hero-swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }
        
        /* Smooth transitions for all slides */
        .hero-swiper .swiper-slide-active {
          transition: all 0.8s ease-in-out;
        }
        
        /* Enhanced button hover effects */
        .hero-swiper button:hover {
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .hero-swiper button:active {
          transform: translateY(-50%) scale(0.95);
        }
        
        /* Ensure smooth fade effect */
        .hero-swiper .swiper-slide {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        
        .hero-swiper .swiper-slide-active {
          opacity: 1;
        }
        
        .hero-swiper .swiper-slide-prev,
        .hero-swiper .swiper-slide-next {
          opacity: 0;
        }
        
        /* Dark mode adjustments */
        .dark .hero-swiper-pagination-bullet {
          background: rgba(156, 163, 175, 0.5);
        }
        
        .dark .hero-swiper-pagination-bullet-active {
          background: rgba(156, 163, 175, 1);
        }
        
        .dark .hero-swiper-pagination-bullet:hover {
          background: rgba(156, 163, 175, 0.8);
        }
      `}</style>
    </motion.section>
  );
};

export default HeroSection; 