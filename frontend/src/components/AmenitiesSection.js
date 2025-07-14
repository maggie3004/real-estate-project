import React from 'react';
import { motion } from 'framer-motion';
import { FaSwimmingPool, FaParking, FaDumbbell, FaShieldAlt, FaBolt, FaChild, FaTree, FaVideo, FaHome, FaCheckCircle } from 'react-icons/fa';
import properties from '../data/properties';

const amenityIcons = {
  'Parking': <FaParking className="text-gold w-8 h-8 mb-2" />,
  'Swimming Pool': <FaSwimmingPool className="text-gold w-8 h-8 mb-2" />,
  'Gym': <FaDumbbell className="text-gold w-8 h-8 mb-2" />,
  '24x7 Security': <FaShieldAlt className="text-gold w-8 h-8 mb-2" />,
  'Power Backup': <FaBolt className="text-gold w-8 h-8 mb-2" />,
  "Children's Play Area": <FaChild className="text-gold w-8 h-8 mb-2" />,
  'Club House': <FaHome className="text-gold w-8 h-8 mb-2" />,
  'Garden': <FaTree className="text-gold w-8 h-8 mb-2" />,
  'CCTV': <FaVideo className="text-gold w-8 h-8 mb-2" />,
};

const AmenitiesSection = () => {
  // Use amenities from the first property as a sample
  const amenities = properties[0]?.amenities || [];

  return (
    <motion.section
      id="amenities"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl font-playfair font-bold text-primary-700 dark:text-gold mb-8 text-center"
        >
          Amenities
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center"
        >
          {amenities.map((amenity) => (
            <div key={amenity} className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gold/30 p-6 w-full max-w-xs text-center hover:shadow-xl transition-all duration-200 scale-100 hover:scale-105 focus:scale-105">
              {amenityIcons[amenity] || <FaCheckCircle className="text-gold w-8 h-8 mb-2" />}
              <span className="font-montserrat text-lg font-semibold text-white">{amenity}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AmenitiesSection; 