import React from 'react';
import { motion } from 'framer-motion';

const heroImage = process.env.PUBLIC_URL + '/hero-building.jpg';

const HeroSection = () => {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-16 w-full"
      style={{ background: `linear-gradient(120deg, rgba(255,215,0,0.18) 0%, rgba(240,101,149,0.12) 100%), url('${heroImage}') center/cover no-repeat` }}
    >
      {/* Overlay for glassy effect */}
      <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/60 backdrop-blur-[2px] z-0" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-center"
        >
          <span style={{ color: '#E53935' }}>Welcome to</span> <span className="block text-white font-playfair">Shree Ganesh Builders</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl font-quicksand mb-8 max-w-2xl mx-auto text-gray-800 dark:text-gray-100 text-center"
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
    </motion.section>
  );
};

export default HeroSection; 