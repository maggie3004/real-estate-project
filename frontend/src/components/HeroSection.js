import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSection = () => {
  // Preload images for better performance
  React.useEffect(() => {
    const imageUrls = [
      '/assets/shree-ganesh-srushti/gallery/front.jpg',
      '/assets/shree-ganesh-heights/gallery/front.jpeg',
      '/assets/sai-shraddha-apartment/gallery/front.jpg'
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Carousel data with 3 high-quality building images
  const carouselData = [
    {
      id: 1,
      image: '/assets/shree-ganesh-srushti/gallery/front.jpg',
      title: 'Luxury Living Redefined',
      subtitle: 'Premium properties with world-class amenities'
    },
    {
      id: 2,
      image: '/assets/shree-ganesh-heights/gallery/front.jpeg',
      title: 'Shree Ganesh Heights',
      subtitle: 'Excellence in every detail'
    },
    {
      id: 3,
      image: '/assets/sai-shraddha-apartment/gallery/front.jpg',
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
        navigation={{
          nextEl: '.hero-swiper-button-next',
          prevEl: '.hero-swiper-button-prev',
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
      <div className="hero-swiper-button-prev absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg z-30 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:scale-110">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="hero-swiper-button-next absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/30 dark:hover:bg-gray-700/50 text-white dark:text-gray-200 p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg z-30 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:scale-110">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Custom Pagination */}
      <div className="hero-swiper-pagination absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-30"></div>
    </motion.section>
  );
};

export default HeroSection; 