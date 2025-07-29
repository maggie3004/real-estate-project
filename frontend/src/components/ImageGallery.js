import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes, FaDownload } from 'react-icons/fa';

const ImageGallery = ({ images, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDownloadBrochure = (e) => {
    e.stopPropagation();
    try {
      window.open('/Shri Ganesh Heights.pdf', '_blank');
    } catch (error) {
      console.error('Error opening brochure:', error);
      alert('Unable to open the brochure. Please try again later.');
    }
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop for closing */}
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button
          className="text-white px-4 py-2 rounded-lg bg-gold hover:bg-gold/90 transition-colors flex items-center gap-2"
          onClick={handleDownloadBrochure}
          aria-label="Download brochure"
        >
          <FaDownload size={20} />
          <span className="text-sm hidden md:inline">Download Brochure</span>
        </button>
        <button
          className="text-white p-2 hover:bg-white/10 rounded-full transition-colors bg-black/30"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close gallery"
        >
          <FaTimes size={24} />
        </button>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full transition-colors z-10 bg-black/30"
        onClick={handlePrevious}
        aria-label="Previous image"
      >
        <FaChevronLeft size={32} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full transition-colors z-10 bg-black/30"
        onClick={handleNext}
        aria-label="Next image"
      >
        <FaChevronRight size={32} />
      </button>
    </motion.div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageGallery;
