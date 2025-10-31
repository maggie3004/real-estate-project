import React from 'react';
import { FaTrophy, FaMedal, FaAward, FaCertificate, FaLeaf } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const awards = [
  { icon: <FaTrophy className="w-8 h-8 text-yellow-500" />, name: 'Deshdoot - Best Building Award', year: '2025' },
  { icon: <FaAward className="w-8 h-8 text-yellow-500" />, name: 'Dainik Bhaskar - Best Affordable Project', year: '2024' },
  { icon: <FaMedal className="w-8 h-8 text-yellow-500" />, name: 'MY FM - Best Group Housing', year: '2024' },
  { icon: <FaCertificate className="w-8 h-8 text-yellow-500" />, name: 'Ultratech - Best Quality', year: '2023' },
  { icon: <FaLeaf className="w-8 h-8 text-yellow-500" />, name: 'Sustainable Housing', year: '2023' }
];

const AwardsSection = () => (
  <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Awards & Recognition
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Celebrating excellence and recognition in the real estate industry
        </p>
      </div>

      <div className="featured-slider-container relative max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, FreeMode]}
          spaceBetween={16}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          navigation={{
            nextEl: '.swiper-button-next-awards-home',
            prevEl: '.swiper-button-prev-awards-home'
          }}
          pagination={{ clickable: true, el: '.swiper-pagination-awards-home' }}
          freeMode={true}
          className="featured-slider"
        >
          {awards.map((award, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center min-h-[160px] md:min-h-[180px]">
                <div className="mb-3 md:mb-4 flex justify-center">
                  {award.icon}
                </div>
                <div className="font-bold text-xs sm:text-sm md:text-base text-gray-900 dark:text-white mb-2 leading-tight">
                  {award.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {award.year}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev-awards-home absolute left-0 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 z-10 cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="swiper-button-next-awards-home absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 z-10 cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <div className="swiper-pagination-awards-home flex justify-center mt-6 space-x-2"></div>
      </div>
    </div>
  </section>
);

export default AwardsSection;