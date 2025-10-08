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
  location,
  progressStage,
  locationChips,
  floorPlans,
  downloads,
  advantages,
  testimonials,
  cost,
  timeline
}) => {
  // Initialize state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [activeFloorIdx, setActiveFloorIdx] = useState(0);
  const [selectedTimelineIdx, setSelectedTimelineIdx] = useState(0);

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
  const currentProgressStage = typeof progressStage === 'number' ? progressStage : 2; // 0..3
  const progressSteps = ['Launch', 'Foundation', 'Structure', 'Finishing'];
  const hasImages = Array.isArray(images) && images.length > 0;
  const filteredDownloads = Array.isArray(downloads)
    ? downloads.filter(doc => doc && doc.href !== brochurePath && !(doc.label && doc.label.toLowerCase().includes('brochure')))
    : [];

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
          <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex items-end pb-10 text-center">
            <div className="w-full">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-3">{projectName}</h1>
              <p className="text-white/90 text-sm md:text-lg mb-4">{tagline}</p>
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
      <section className={`w-full py-10 ${isOngoingVariant ? 'bg-white dark:bg-black' : 'bg-gray-900/5 dark:bg-black/50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          </div>
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

      

      {/* About Section (moved before Brochure CTA) */}
      {isOngoingVariant && (
        <section id="section-about" className="w-full py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-10">
            <div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">About</h2>
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed text-justify">{description}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brochure CTA (before Amenities) */}
      {brochurePath && (
        <section id="section-brochure" className="w-full py-6 bg-white dark:bg-black">
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

      {/* Smart Location Chips */}
      {Array.isArray(locationChips) && locationChips.length > 0 && (
        <section className="w-full py-6 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
            {locationChips.map((chip, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300">
                {chip}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Floor Plans */}
      {Array.isArray(floorPlans) && floorPlans.length > 0 && (
        <section id="section-floorplans" className="w-full py-10 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Floor Plans</h3>
              <div className="flex gap-2">
                {floorPlans.map((plan, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFloorIdx(idx)}
                    className={`px-3 py-1.5 rounded-md text-xs border ${activeFloorIdx === idx ? 'bg-gold text-black border-gold' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}
                  >
                    {plan.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-[linear-gradient(45deg,#f5f5f5_25%,transparent_25%),linear-gradient(-45deg,#f5f5f5_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f5f5f5_75%),linear-gradient(-45deg,transparent_75%,#f5f5f5_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0] dark:bg-none">
              <img
                src={floorPlans[activeFloorIdx]?.src}
                alt={floorPlans[activeFloorIdx]?.label}
                className="w-full h-auto object-contain transition-transform duration-200 hover:scale-[1.015]"
              />
              <div className="absolute inset-0 pointer-events-none" />
            </div>
          </div>
        </section>
      )}

      {/* Downloads Center */}
      {filteredDownloads.length > 0 && (
        <section id="section-downloads" className="w-full py-10 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">Downloads</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredDownloads.map((doc, idx) => (
                <a key={idx} href={doc.href} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-gray-200 hover:border-gold transition">
                  {doc.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Advantages */}
      {Array.isArray(advantages) && advantages.length > 0 && (
        <section className="w-full py-10 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Advantages</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {advantages.map((item, idx) => (
                <div key={idx} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center text-sm text-gray-800 dark:text-gray-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {Array.isArray(testimonials) && testimonials.length > 0 && (
        <section className="w-full py-10 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, idx) => (
              <div key={idx} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                <div className="text-sm text-gray-800 dark:text-gray-200 mb-2">“{t.quote}”</div>
                <div className="text-xs text-gray-500">— {t.author}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cost Breakdown */}
      {cost && (
        <section className="w-full py-10 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">Cost Breakdown</h3>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="grid grid-cols-2 text-sm">
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300">Base Price</div>
                <div className="p-3 text-gray-900 dark:text-white">{cost.base || 'On Request'}</div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300">Govt Taxes</div>
                <div className="p-3 text-gray-900 dark:text-white">{cost.taxes || 'As applicable'}</div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300">Maintenance</div>
                <div className="p-3 text-gray-900 dark:text-white">{cost.maintenance || 'TBD'}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Construction Timeline (clickable with preview) */}
      {Array.isArray(timeline) && timeline.length > 0 && (
        <section className="w-full py-10 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">Construction Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2">
                <div className="relative">
                  <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
                  <div className="absolute inset-0 flex justify-between">
                    {timeline.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTimelineIdx(idx)}
                        className="relative w-1/4 flex-1"
                        title={step.label}
                      >
                        <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${idx <= selectedTimelineIdx ? 'bg-gold' : 'bg-gray-300 dark:bg-gray-700'}`} />
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-gray-600 dark:text-gray-400">{step.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
                <img src={timeline[selectedTimelineIdx]?.image} alt={timeline[selectedTimelineIdx]?.label} className="w-full h-36 object-cover" />
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">{timeline[selectedTimelineIdx]?.label}</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">{timeline[selectedTimelineIdx]?.caption}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Amenities Section */}
      <section className="w-full py-10 bg-gray-900/5 dark:bg-black/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-semibold mb-6 text-gold text-center">Amenities</div>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {amenities.map((amenity, idx) => (
              <div key={idx} className="bg-gray-800/90 rounded-xl p-5 text-white text-center transition-transform duration-200 hover:translate-y-0.5 flex flex-col items-center justify-center border border-white/5">
                <span className="text-gold text-3xl md:text-4xl block mb-3">{amenity.icon}</span>
                <span className="text-base md:text-lg font-medium block">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Gallery Section (shared slider + thumbnails) */}
      <section id="section-gallery" className="w-full py-12 bg-gray-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gold text-center">Gallery</div>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          </div>

          {/* Main Image Slider */}
          {hasImages && (
            <div className="rounded-xl overflow-hidden shadow-lg mb-3 relative aspect-[16/9] max-h-[600px] w-full group">
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

          {/* Filmstrip Thumbnails */}
          {hasImages && (
            <div className="relative overflow-hidden">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1" onMouseEnter={(e) => { e.currentTarget.scrollLeft += 0; }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-16 w-28 flex-shrink-0 rounded-md overflow-hidden border ${idx === currentImageIndex ? 'border-gold' : 'border-gray-300 dark:border-gray-700'}`}
                    title={`Slide ${idx + 1}`}
                  >
                    <img src={img} alt={`Thumb ${idx+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
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
      <section id="section-location" className="w-full py-8 bg-gray-900/5 dark:bg-black/50">
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