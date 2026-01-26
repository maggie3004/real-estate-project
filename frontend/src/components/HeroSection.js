import React, { useRef, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ScrollDirectionContext } from '../context/ScrollDirectionContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSection = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const heroRef = useRef(null);

  // Parallax effect on scroll
  const { scrollY } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Subtle parallax movement
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Add spring for smoother motion
  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  // Carousel data with 3 high-quality building images
  const carouselData = [
    {
      id: 1,
      image: '/assets/shree-ganesh-heights/gallery/herowp.webp',
      projectName: 'Shree Ganesh Heights',
      title: 'EXPERIENCE',
      title2: 'ESSENCE',
      title3: 'OF ELEVATED LIVING',
      subtitle: 'Exclusive 1 BHK Happy Homes',
      route: '/ShreeGaneshHeights'
    },
    {
      id: 2,
      image: '/assets/shree-ganesh-park/gallery/herowp.webp',
      projectName: 'Shree Ganesh Park',
      title: 'RISE TO',
      title2: 'NEW WAY OF',
      title3: 'LIVING',
      subtitle: '1 & 2 BHK Luxury Homes & Shops',
      route: '/ShreeGaneshParkPhaseI'
    },
    {
      id: 3,
      image: '/assets/shree-ganesh-srushti/gallery/heroweb.webp',
      projectName: 'Shree Ganesh Srushti',
      title: 'THE',
      title2: 'NEW LANGUAGE',
      title3: 'OF LIVING',
      subtitle: '1, 2 & 3 BHK Happy Homes & Shops',
      route: '/ShreeGaneshSrushti'
    }
  ];

  // Preload only the first image for faster initial load
  React.useEffect(() => {
    const firstImageUrl = carouselData[0]?.image;
    if (firstImageUrl) {
      const img = new Image();
      img.src = firstImageUrl;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const scrollDirection = useContext(ScrollDirectionContext);

  return (
    <motion.section
      ref={heroRef}
      id="home"
      initial={{ opacity: 0, y: 40 }}
      animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
      whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hero-section relative overflow-hidden"
    >
      <motion.div style={{ y: smoothY }}>
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          speed={1000}
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
          className="hero-swiper"
          style={{ width: '100%', aspectRatio: '3 / 2', minHeight: '70vh', margin: 0, padding: 0 }}
        >
          {carouselData.map((slide, index) => (
            <SwiperSlide key={slide.id} className="relative">
              <div
                className="relative h-full w-full bg-gray-900 cursor-pointer group overflow-hidden"
                style={{ width: '100%', height: '100%', position: 'relative' }}
                onClick={() => navigate(slide.route)}
                role="button"
                tabIndex={0}
                aria-label={`Navigate to ${slide.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(slide.route);
                  }
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="hero-image"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center bottom',
                    display: 'block'
                  }}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(e) => {
                    e.target.src = '/hero-building.jpg';
                  }}
                />

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 dark:from-black/30 dark:via-black/40 dark:to-black/60"></div>

                {/* Slide-specific content */}
                <div className="absolute top-8 sm:top-10 md:top-12 lg:top-16 left-4 sm:left-8 md:left-12 lg:left-16 right-4 z-10 max-w-3xl">
                  {/* Project Name at Top */}
                  <motion.h4
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl"
                  >
                    {slide.projectName}
                  </motion.h4>

                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 md:mb-6"
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white uppercase leading-tight tracking-wide drop-shadow-2xl"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white uppercase leading-tight tracking-wide drop-shadow-2xl"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {slide.title2}
                    </h2>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white uppercase leading-tight tracking-wide drop-shadow-2xl"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {slide.title3}
                    </h3>
                  </motion.div>

                  {/* Decorative golden line */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="w-16 sm:w-20 md:w-24 lg:w-32 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-3 sm:mb-4 md:mb-6 shadow-lg"
                    style={{
                      boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
                      originX: 0
                    }}
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-light tracking-wide drop-shadow-lg"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {slide.subtitle}
                  </motion.p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

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
      <style>{`
        .hero-section {
          width: 100% !important;
          aspect-ratio: 3 / 2 !important;
          min-height: 70vh !important;
          margin: 0 !important;
          padding: 0 !important;
          position: relative !important;
        }

        .hero-swiper {
          width: 100% !important;
          aspect-ratio: 3 / 2 !important;
          min-height: 70vh !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .hero-swiper .swiper-slide {
          width: 100% !important;
          aspect-ratio: 3 / 2 !important;
          min-height: 70vh !important;
          position: relative !important;
        }
        
        .hero-swiper .swiper-slide > div {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
          overflow: hidden !important;
        }
        
        .hero-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center bottom !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          display: block !important;
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