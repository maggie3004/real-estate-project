import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay, FaExpand } from 'react-icons/fa';
import ImageGallery from './ImageGallery';
import FloatingActions from './FloatingActions';

const ProjectTemplate = ({ 
  projectName,
  tagline,
  description,
  stats,
  amenities,
  images,
  brochurePath,
  mapUrl,
  directionsUrl,
  reraNumber,
  reraQr,
  layoutVariant,
  configuration,
  location
}) => {
  // Initialize state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGalleryOpen, setGalleryOpen] = useState(false);

  // Navigation functions
  const handleNext = useCallback(() => setCurrentImageIndex((prev) => (prev + 1) % images.length), [images.length]);
  const handlePrevious = useCallback(() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length), [images.length]);
  const togglePlayPause = useCallback(() => setIsPlaying(!isPlaying), [isPlaying]);

  // Autoplay effect
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(handleNext, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, handleNext]);

  const isOngoingVariant = layoutVariant === 'ongoing' || Boolean(reraNumber);

  const hasImages = Array.isArray(images) && images.length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#181818] dark:text-white transition-colors duration-300">
      <FloatingActions 
        brochurePath={brochurePath}
        projectName={projectName}
      />

      {/* Hero Section */}
      {isOngoingVariant ? (
        <section className="relative w-full h-[46vh] md:h-[56vh] mt-16 overflow-hidden">
          <img 
            src={images?.[0]}
            alt={projectName + ' hero'}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex items-end pb-8 text-center">
            <div className="w-full">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{projectName}</h1>
              <p className="text-white/90 text-sm md:text-base mb-3">{tagline}</p>
              <div className="flex items-center justify-center gap-2">
                {configuration && <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/30 text-white text-xs md:text-sm border border-white/20">{configuration}</span>}
                {location && <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/30 text-white text-xs md:text-sm border border-white/20">{location}</span>}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full py-8 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gold text-center">{projectName}</h1>
            <div className="text-base md:text-lg text-gold/90 mb-8 text-center">{tagline}</div>
            <div className="text-gray-200 text-base md:text-lg leading-relaxed text-justify">
              {description}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className={`w-full py-8 ${isOngoingVariant ? 'bg-white dark:bg-black' : 'bg-gray-900/5 dark:bg-black/50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                <div className="text-lg md:text-xl font-semibold text-gold mb-1">{stat.title}</div>
                <div className="text-base md:text-lg text-gray-700 dark:text-gray-300">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure CTA (before Amenities) */}
      {brochurePath && (
        <section className="w-full py-6 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 flex justify-center">
            <a
              href={brochurePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gold text-gold font-semibold px-5 py-3 rounded-lg hover:bg-gold hover:text-black transition"
            >
              Download Brochure
            </a>
          </div>
        </section>
      )}

      {/* Amenities Section */}
      <section className="w-full py-8 bg-gray-900/5 dark:bg-black/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-semibold mb-8 text-gold text-center">Amenities</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {amenities.map((amenity, idx) => (
              <div key={idx} className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg text-white text-center transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                <span className="text-gold text-3xl md:text-4xl block mb-3 md:mb-4">{amenity.icon}</span>
                <span className="text-lg md:text-xl font-medium block">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content + Sidebar for ongoing variant */}
      {isOngoingVariant && (
        <section className="w-full py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-10">
            <div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">About</h2>
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">{description}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section (shared slider + thumbnails) */}
      <section className="w-full py-12 bg-gray-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gold text-center">Gallery</div>

          {/* Main Image Slider */}
          {hasImages && (
            <div className="rounded-xl overflow-hidden shadow-lg mb-6 relative aspect-[16/9] max-h-[600px] w-full group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`${projectName} Slide ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover bg-gray-900"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handlePrevious}
                  className="p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                  aria-label="Previous slide"
                >
                  <FaChevronLeft size={32} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                  aria-label="Next slide"
                >
                  <FaChevronRight size={32} />
                </button>
              </div>

              {/* Controls and Progress */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex items-center justify-between">
                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                  </button>
                  <div className="flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex 
                            ? 'bg-white w-4' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Thumbnails Grid */}
          {hasImages && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {images.map((img, idx) => (
              <div 
                key={idx} 
                className="relative group cursor-pointer rounded-lg overflow-hidden"
                onClick={() => {
                  setCurrentImageIndex(idx);
                  setGalleryOpen(true);
                }}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${idx+1}`} 
                  className={`rounded-lg aspect-[4/3] w-full object-cover transition-all duration-300 group-hover:scale-105 ${
                    idx === currentImageIndex ? 'outline outline-2 outline-gold' : 'outline outline-1 outline-transparent'
                  }`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              ))}
            </div>
          )}

          {/* Full Screen Gallery Modal */}
          <ImageGallery
            images={images}
            isOpen={isGalleryOpen}
            onClose={() => setGalleryOpen(false)}
          />
        </div>
      </section>

      {/* Location Section */}
      <section className="w-full py-8 bg-gray-900/5 dark:bg-black/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-semibold mb-8 text-gold text-center">Location</div>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${projectName} Location`}
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                <span>Get Directions</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* No sticky CTA for clean minimal layout */}
    </div>
  );
};

export default ProjectTemplate;