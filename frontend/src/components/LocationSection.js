import React from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ScrollDirectionContext } from '../context/ScrollDirectionContext';

// Use fixed office embed URL and address per client request
const mapSrc = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d331.4249048947742!2d73.7480104789185!3d19.981436320890978!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb620c8d651f%3A0xde5e213219bc1ff2!2sXPJX%2BG74%2C%20Janak%20Nagari%2C%20Nashik%2C%20Maharashtra%20422008%2C%20India!5e0!3m2!1sen!2sus!4v1761939234341!5m2!1sen!2sus";

const address = `P. No. 14, Sneh Prasad, Vighnaharta Colony, Khutwad Nagar, Nashik - 08`;

const LocationSection = () => {
  const scrollDirection = useContext(ScrollDirectionContext);

  return (
    <motion.section
      id="location"
      initial={{ opacity: 0, y: 40 }}
      animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
      whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-16 bg-white dark:bg-black/50"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
          whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl font-playfair font-bold text-black dark:text-white mb-8 text-center"
        >
          Office Location
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
            whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="w-full lg:w-2/3 h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border-2 border-gold/20"
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
            animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
            whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="w-full md:w-1/3 text-center md:text-left"
          >
            <h3 className="text-2xl font-montserrat font-bold text-black dark:text-white mb-4">Office Address:</h3>
            <p className="text-lg text-gray-700 dark:text-gray-200 font-semibold mb-2 whitespace-pre-line">{address}</p>
            <p className="text-base text-gray-500 dark:text-gray-400">(For directions, click on the map)</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default LocationSection; 