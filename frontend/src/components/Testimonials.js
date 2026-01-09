import React from 'react';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: "Gaurav Yeole",
    role: "Homeowner - Sai Shraddha",
    image: null,
    rating: 5,
    text: "We are extremely happy with our new home at Sai Shraddha. The quality of construction is outstanding, and the amenities are world-class. The team was very professional throughout the entire process. Highly recommended!",
    project: "Sai Shraddha",
    date: "2023"
  },
  {
    id: 2,
    name: "Pravin Patil",
    role: "Investor - Sai Shraddha",
    image: null,
    rating: 5,
    text: "Investing in Sai Shraddha Apartment was the best decision we made. The project quality and attention to detail are commendable. The builder's transparency and commitment to excellence are truly outstanding.",
    project: "Sai Shraddha",
    date: "2023"
  },
  {
    id: 3,
    name: "Kavishwar Ahire",
    role: "Homeowner - Sai Shraddha",
    image: null,
    rating: 5,
    text: "Sai Shraddha exceeded all our expectations. The luxury finishes, premium amenities, and exceptional construction quality make it a truly premium living experience. A perfect choice!",
    project: "Sai Shraddha",
    date: "2023"
  },
  {
    id: 4,
    name: "Vishal Mahajan",
    role: "Homeowner - Shree Ganesh Avenue",
    image: null,
    rating: 5,
    text: "Shree Ganesh Avenue offers the perfect blend of affordability and quality. The strategic location and construction quality make it an excellent investment. Very satisfied with our purchase!",
    project: "Shree Ganesh Avenue",
    date: "2022"
  },
  {
    id: 5,
    name: "Rahul Suradkar",
    role: "Family - Shree Ganesh Avenue",
    image: null,
    rating: 5,
    text: "We found the perfect budget-friendly home at Shree Ganesh Avenue. The quality of construction and amenities are much better than expected. The builder's customer service is exceptional.",
    project: "Shree Ganesh Avenue",
    date: "2022"
  },
  {
    id: 6,
    name: "Prashant Suryawanshi",
    role: "Homeowner - Shree Ganesh Park",
    image: null,
    rating: 5,
    text: "Shree Ganesh Park perfectly balances luxury and affordability. The modern amenities, smart features, and excellent construction quality make it an ideal home for our family.",
    project: "Shree Ganesh Park",
    date: "2024"
  },
  {
    id: 7,
    name: "Sachin Pote",
    role: "Investor - Shree Ganesh Park",
    image: null,
    rating: 5,
    text: "The investment returns at Shree Ganesh Park have been excellent. The builder's commitment to quality and timely delivery is impressive. A truly reliable development partner.",
    project: "Shree Ganesh Park",
    date: "2024"
  },
  {
    id: 8,
    name: "Mohan Alane",
    role: "Homeowner - Shree Ganesh Park",
    image: null,
    rating: 5,
    text: "Living at Shree Ganesh Park is a dream come true. The perfect combination of luxury amenities and affordable pricing, along with excellent customer support throughout the process.",
    project: "Shree Ganesh Park",
    date: "2024"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-amber-50 dark:bg-amber-950/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-700 dark:text-white mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from the families who have made their dreams come true with us.
          </p>
        </div>

        {/* Testimonials Swiper */}
        <div className="testimonials-slider-container relative max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, FreeMode, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-testimonials',
              prevEl: '.swiper-button-prev-testimonials'
            }}
            pagination={{ clickable: true, el: '.swiper-pagination-testimonials' }}
            freeMode={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            className="testimonials-slider"
          >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                  {/* Quote Icons */}
                  <FaQuoteLeft className="absolute top-6 left-6 text-gold text-2xl opacity-20" />
                  <FaQuoteRight className="absolute bottom-6 right-6 text-gold text-2xl opacity-20" />

                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Customer Image */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        {testimonial.image ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gold shadow-lg transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gold to-gold-600 border-4 border-gold shadow-lg flex items-center justify-center">
                            <span className="text-white text-2xl md:text-3xl font-bold">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        <div className="absolute -bottom-2 -right-2 bg-gold text-white rounded-full p-2">
                          <FaQuoteLeft className="text-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      {/* Rating */}
                      <div className="flex justify-center lg:justify-start gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-gold text-xl" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </p>

                      {/* Customer Info */}
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-amber-700 dark:text-amber-600">
                          {testimonial.name}
                        </h4>
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="bg-gold text-white px-3 py-1 rounded-full font-semibold">
                            {testimonial.project}
                          </span>
                          <span>{testimonial.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="swiper-button-prev-testimonials absolute left-0 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 z-10 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next-testimonials absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 z-10 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="swiper-pagination-testimonials flex justify-center mt-6 space-x-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 