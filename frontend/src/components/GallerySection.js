import React from 'react';
import { motion } from 'framer-motion';
import properties from '../data/properties';

const getAllImages = () => {
  // Collect all unique images from all properties
  const images = [];
  properties.forEach((p) => {
    if (Array.isArray(p.images)) {
      p.images.forEach((img) => images.push(img));
    } else if (p.image) {
      images.push(p.image);
    }
  });
  // Remove duplicates
  return Array.from(new Set(images));
};

const GallerySection = () => {
  const images = getAllImages();

  return (
    <motion.section
      id="gallery"
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
          Gallery
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {images.map((img, idx) => (
            <a
              key={img + idx}
              href={img}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <img
                src={img}
                srcSet={`${img} 1x, ${img} 2x`}
                sizes="(max-width: 640px) 100vw, 25vw"
                alt={`Gallery ${idx + 1}`}
                className="w-full h-48 object-cover rounded-2xl shadow-lg border-2 border-gold/20 group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GallerySection; 