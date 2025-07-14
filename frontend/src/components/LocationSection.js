import React from 'react';
import { motion } from 'framer-motion';
import properties from '../data/properties';

const property = properties[0];
const { location, lat, lng } = property || {};

const mapSrc = lat && lng
  ? `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`
  : '';

const address = location || 'Project Location';

const LocationSection = () => {
  return (
    <motion.section
      id="location"
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
          Location
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="w-full md:w-2/3 h-80 rounded-2xl overflow-hidden shadow-lg border-2 border-gold/20"
          >
            {mapSrc ? (
              <iframe
                title="Project Location Map"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500">Map not available</div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="w-full md:w-1/3 text-center md:text-left"
          >
            <h3 className="text-2xl font-montserrat font-bold text-primary-700 dark:text-gold mb-4">Project Address</h3>
            <p className="text-lg text-gray-700 dark:text-gray-200 font-semibold mb-2">{address}</p>
            <p className="text-base text-gray-500 dark:text-gray-400">(For directions, click on the map)</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default LocationSection; 