import React from 'react';
import { motion } from 'framer-motion';
import properties from '../data/properties';

const PricingFloorPlanSection = () => {
  return (
    <motion.section
      id="price"
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
          Pricing & Floor Plans
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="overflow-x-auto"
        >
          <table className="min-w-full bg-white dark:bg-black rounded-2xl shadow-lg border border-gold/30">
            <thead>
              <tr className="bg-gradient-to-r from-gold to-primary-500 text-white dark:text-[#181818]">
                <th className="px-6 py-4 text-left font-montserrat text-lg text-white dark:text-[#181818]">Type</th>
                <th className="px-6 py-4 text-left font-montserrat text-lg text-white dark:text-[#181818]">Area</th>
                <th className="px-6 py-4 text-left font-montserrat text-lg text-white dark:text-[#181818]">Price</th>
                <th className="px-6 py-4 text-left font-montserrat text-lg text-white dark:text-[#181818]">Location</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p, idx) => (
                <tr key={p.id} className={idx % 2 === 0 ? 'bg-white dark:bg-black' : 'bg-gray-50 dark:bg-gray-900'}>
                  <td className="px-6 py-4 font-semibold text-[#181818] dark:text-white">{p.title}</td>
                  <td className="px-6 py-4 text-[#181818] dark:text-white">{p.area || (p.bedrooms + ' BHK')}</td>
                  <td className="px-6 py-4 text-gold font-bold">{p.price}</td>
                  <td className="px-6 py-4 text-[#181818] dark:text-white">{p.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex justify-center mt-8"
        >
          <a
            href="/Shri Ganesh Heights.pdf"
            download
            className="inline-block px-8 py-4 bg-gradient-to-r from-gold to-primary-500 text-white font-bold rounded-full shadow-lg hover:from-primary-500 hover:to-gold hover:text-gold transition-all duration-200 border-2 border-gold scale-100 hover:scale-105 focus:scale-105"
          >
            Download Floor Plan (PDF)
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PricingFloorPlanSection; 