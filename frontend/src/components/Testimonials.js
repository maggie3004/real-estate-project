import React, { useState, useEffect, useCallback } from 'react';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextTestimonial = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToTestimonial = (index) => {
    if (isTransitioning || index === activeIndex) return;
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlaying(true); // Resume auto-play after 3 seconds
    }, 600);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#E53935] mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from the families who have made their dreams come true with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Quote Icons */}
            <FaQuoteLeft className="absolute top-6 left-6 text-gold text-2xl opacity-20" />
            <FaQuoteRight className="absolute bottom-6 right-6 text-gold text-2xl opacity-20" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.5 }
                }}
                className="flex flex-col lg:flex-row items-center gap-8"
              >
                {/* Customer Image */}
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="relative">
                    {testimonials[activeIndex].image ? (
                      <img 
                        src={testimonials[activeIndex].image} 
                        alt={testimonials[activeIndex].name}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gold shadow-lg transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gold to-gold-600 border-4 border-gold shadow-lg flex items-center justify-center">
                        <span className="text-white text-2xl md:text-3xl font-bold">
                          {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 bg-gold text-white rounded-full p-2">
                      <FaQuoteLeft className="text-sm" />
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Rating */}
                  <motion.div 
                    className="flex justify-center lg:justify-start gap-1 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                      >
                        <FaStar className="text-gold text-xl" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.p 
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    "{testimonials[activeIndex].text}"
                  </motion.p>

                  {/* Customer Info */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <h4 className="text-xl font-bold text-[#E53935]">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {testimonials[activeIndex].role}
                    </p>
                    <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="bg-gold text-white px-3 py-1 rounded-full font-semibold">
                        {testimonials[activeIndex].project}
                      </span>
                      <span>{testimonials[activeIndex].date}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gold hover:text-white transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gold hover:text-white transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === activeIndex ? 'bg-gold' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 