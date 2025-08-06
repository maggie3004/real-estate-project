import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import properties from '../data/properties';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get top 3 properties
  const topProperties = properties.slice(0, 3);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topProperties.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, topProperties.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topProperties.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + topProperties.length) % topProperties.length);
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
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {topProperties.map((property, index) => (
            <div key={property.id} className="w-full flex-shrink-0 h-full">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${property.images[0]})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-center"
        >
          <span style={{ color: '#E53935' }}>Welcome to</span> <span className="block text-white font-playfair">Ganesh Yeole Builders and Developers</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl font-quicksand mb-8 max-w-2xl mx-auto text-gray-100 text-center"
        >
          Redefining luxury living with trust, quality, and prime locations.<br />Your dream home awaits in our landmark projects.
        </motion.p>
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/Shri Ganesh Heights.pdf"
            download
            className="btn-primary bg-gold text-white font-bold px-8 py-4 rounded-full shadow-gold hover:bg-white hover:text-gold transition-all duration-200 border-2 border-gold scale-100 hover:scale-105 focus:scale-105"
          >
            Download Brochure
          </a>
          <a
            href="#contact"
            className="btn-primary bg-gold text-white font-bold px-8 py-4 rounded-full shadow-gold hover:bg-white hover:text-gold transition-all duration-200 border-2 border-gold scale-100 hover:scale-105 focus:scale-105"
          >
            Enquire Now
          </a>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg shadow-lg transition-all duration-200 text-sm z-20"
      >
        {isAutoPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {topProperties.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-gold scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default HeroSection; 