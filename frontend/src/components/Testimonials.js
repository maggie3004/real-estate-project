import React, { useState } from 'react';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Rajesh & Priya Sharma",
    role: "Homeowners - Shree Ganesh Heights",
    image: "/owner-placeholder.png",
    rating: 5,
    text: "We are extremely happy with our new home at Shree Ganesh Heights. The quality of construction is outstanding, and the amenities are world-class. The team was very professional throughout the entire process. Highly recommended!",
    project: "Shree Ganesh Heights",
    date: "March 2024"
  },
  {
    id: 2,
    name: "Amit & Sneha Desai",
    role: "Investors - Sai Shraddha Apartment",
    image: "/owner-placeholder.png",
    rating: 5,
    text: "Investing in Sai Shraddha Apartment was the best decision we made. The project was delivered on time, and the rental returns are excellent. The builder's transparency and commitment to quality are commendable.",
    project: "Sai Shraddha Apartment",
    date: "January 2024"
  },
  {
    id: 3,
    name: "Dr. Sanjay & Dr. Meera Patel",
    role: "Medical Professionals - Vinayak Apartment",
    image: "/owner-placeholder.png",
    rating: 5,
    text: "As medical professionals, we needed a home close to the hospital. Vinayak Apartment's location is perfect, and the quality of construction exceeded our expectations. The Vastu compliance was an added bonus.",
    project: "Vinayak Apartment",
    date: "December 2023"
  },
  {
    id: 4,
    name: "Vikram & Anjali Singh",
    role: "IT Professionals - Shree Ganesh Park Phase I",
    image: "/owner-placeholder.png",
    rating: 5,
    text: "The modern amenities and smart home features at Shree Ganesh Park Phase I are exactly what we were looking for. The builder's attention to detail and customer service is exceptional.",
    project: "Shree Ganesh Park Phase I",
    date: "November 2023"
  },
  {
    id: 5,
    name: "Sunil & Rekha Joshi",
    role: "Retired Couple - Modakeshwar Apartment",
    image: "/owner-placeholder.png",
    rating: 5,
    text: "We wanted a peaceful retirement home, and Modakeshwar Apartment is perfect. The location is serene, and the quality of construction is top-notch. The builder's team was very helpful throughout.",
    project: "Modakeshwar Apartment",
    date: "October 2023"
  },
  {
    id: 6,
    name: "Arun & Kavita Reddy",
    role: "Business Owners - Shree Ganesh Avenue",
    image: "/owner-placeholder.png",
    rating: 5,
    text: "Shree Ganesh Avenue offers the perfect blend of residential comfort and commercial opportunities. The strategic location and quality construction make it an excellent investment. Highly satisfied!",
    project: "Shree Ganesh Avenue",
    date: "September 2023"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from the families who have made their dreams come true with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative">
            {/* Quote Icons */}
            <FaQuoteLeft className="absolute top-6 left-6 text-gold text-2xl opacity-20" />
            <FaQuoteRight className="absolute bottom-6 right-6 text-gold text-2xl opacity-20" />
            
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Customer Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gold shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gold text-white rounded-full p-2">
                    <FaQuoteLeft className="text-sm" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Rating */}
                <div className="flex justify-center lg:justify-start gap-1 mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <FaStar key={i} className="text-gold text-xl" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonials[activeIndex].text}"
                </p>

                {/* Customer Info */}
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-black">
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
                </div>
              </div>
            </div>
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

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-gold mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-300">Happy Families</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                           <div className="text-3xl font-bold text-red-600 mb-2">4.9/5</div>
            <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                           <div className="text-3xl font-bold text-gold-600 mb-2">98%</div>
            <div className="text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                           <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
            <div className="text-gray-600 dark:text-gray-300">Projects Delivered</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Happy Family?</h3>
            <p className="text-lg mb-6 opacity-90">
              Be part of our success story and find your dream home today
            </p>
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200">
              Schedule a Site Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 