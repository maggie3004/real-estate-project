import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import ImageGallery from './ImageGallery';

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
  
}) => {
  // Initialize state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [activeFloorIdx, setActiveFloorIdx] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);
  
  // Determine variant and gallery images early so navigation can depend on gallery length
  const isOngoingVariant = layoutVariant === 'ongoing' || Boolean(reraNumber);
  // Prepare gallery images: for ongoing projects prefer floorPlans images
  const galleryImages = (isOngoingVariant && Array.isArray(floorPlans) && floorPlans.length > 0)
    ? floorPlans.map(fp => fp.src).filter(Boolean)
    : images;
  const hasImages = Array.isArray(galleryImages) && galleryImages.length > 0;
  const filteredDownloads = Array.isArray(downloads)
    ? downloads.filter(doc => doc && doc.href !== brochurePath && !(doc.label && doc.label.toLowerCase().includes('brochure')))
    : [];

  // Convert Google Maps sharing URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // If it's already an embed URL, return it
    if (url.includes('/embed')) return url;
    
    // If it's a sharing link (maps.app.goo.gl), use iframe-compatible format
    if (url.includes('maps.app.goo.gl') || url.includes('goo.gl')) {
      const query = encodeURIComponent(`${projectName}, ${location || 'Nashik'}`);
      // Use iframe-compatible URL format
      return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    
    // If it's a regular google.com/maps URL, convert to embed
    if (url.includes('google.com/maps')) {
      const coordMatch = url.match(/@([-\d.]+),([-\d.]+)/);
      if (coordMatch) {
        const [, lat, lng] = coordMatch;
        return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      }
    }
    
    // Fallback: create embed URL with search query
    const query = encodeURIComponent(`${projectName}, ${location || 'Nashik'}`);
    return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const embedMapUrl = getEmbedUrl(mapUrl);

  // Navigation functions (operate over galleryImages)
  const handleNext = useCallback(() => setCurrentImageIndex((prev) => (galleryImages.length ? (prev + 1) % galleryImages.length : 0)), [galleryImages.length]);
  const handlePrevious = useCallback(() => setCurrentImageIndex((prev) => (galleryImages.length ? (prev - 1 + galleryImages.length) % galleryImages.length : 0)), [galleryImages.length]);
  const togglePlayPause = useCallback(() => setIsPlaying(!isPlaying), [isPlaying]);

  // Autoplay effect
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(handleNext, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, handleNext]);

  // Ensure currentImageIndex is valid when galleryImages changes
  const galleryLength = galleryImages ? galleryImages.length : 0;

  useEffect(() => {
    if (galleryLength === 0) {
      setCurrentImageIndex(0);
      return;
    }
    if (currentImageIndex >= galleryLength) {
      setCurrentImageIndex(0);
    }
  }, [galleryLength, currentImageIndex]);

  // FloatingActions removed — no-op

  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#181818] dark:text-white transition-colors duration-300">

      {/* Hero Section */}
      {isOngoingVariant ? (
        <section className="relative w-full h-[70vh] md:h-[85vh] mt-16 overflow-hidden">
          <img 
            src={images?.[0]}
            alt={projectName + ' hero'}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
          
          {/* Project Name - Top Left */}
          <div className="absolute top-6 md:top-8 left-6 md:left-8 z-20">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-yellow-600 drop-shadow-2xl">
              {projectName}
            </h1>
          </div>

          {/* RERA Info - Bottom Right */}
          {reraQr && reraNumber && (
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10">
              <div className="flex items-center gap-3">
                <img 
                  src={reraQr} 
                  alt="RERA QR Code" 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white/95 rounded-lg p-1"
                />
                <div className="text-left">
                  <div className="text-xs md:text-sm font-semibold text-white drop-shadow-lg mb-1">RERA Registered</div>
                  <div className="text-xs md:text-sm text-white drop-shadow-lg font-mono">{reraNumber}</div>
                </div>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="w-full py-8 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gold text-center">{projectName}</h1>
            <div className="text-base md:text-lg text-gold/90 mb-8 text-center">{tagline}</div>
            <div className="text-[#181818] dark:text-gray-200 text-base md:text-lg leading-relaxed text-justify">
              {description}
            </div>
          </div>
        </section>
      )}

      

      {/* Stats Section - hidden for ongoing project variant to keep the view focused for customers */}
      {!isOngoingVariant && (
        <section className={`w-full py-10 ${isOngoingVariant ? 'bg-white dark:bg-black' : 'bg-gray-900/5 dark:bg-black/50'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-10 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.isArray(stats) && stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 border border-yellow-600/30 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="text-lg md:text-xl font-semibold text-yellow-600 mb-1">{stat.title}</div>
                  <div className="text-base md:text-lg text-[#181818] dark:text-gray-300">{stat.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      

      {/* About Section (shows short summary with read more) */}
      {isOngoingVariant && (
        <section id="section-about" className="w-full py-12 md:py-16 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Family Photo - Left Side */}
              <div className="w-full">
                <img 
                  src="/family_photo.jpg" 
                  alt="Sai Prasad Group Family" 
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                />
              </div>

              {/* Description - Right Side */}
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-600 dark:text-yellow-600">About the Project</h2>
                <p className="text-[#181818] dark:text-gray-300 text-base md:text-lg leading-relaxed text-justify">
                  {description && !showFullDesc ? (
                    <>
                      {description.length > 300 ? description.slice(0, 300) + '...' : description}
                      {description.length > 300 && (
                        <button onClick={() => setShowFullDesc(true)} className="ml-2 text-yellow-600 hover:text-yellow-600/80 font-semibold transition-colors">Read more</button>
                      )}
                    </>
                  ) : (
                    <>
                      {description}
                      {description && description.length > 300 && (
                        <button onClick={() => setShowFullDesc(false)} className="ml-2 text-yellow-600 hover:text-yellow-600/80 font-semibold transition-colors">Show less</button>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Note: brochure CTA moved to after Floor Plans for ongoing pages to keep a single CTA */}

      {/* Key Advantages - 3x2 Grid */}
      {isOngoingVariant && Array.isArray(advantages) && advantages.length > 0 && (
        <section className="w-full py-12 md:py-16 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-600 mb-8 text-center">Key Advantages</h3>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-600/60 to-transparent" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {advantages.map((item, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl border-2 border-yellow-600/30 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 text-center hover:border-yellow-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-base md:text-lg font-semibold text-[#181818] dark:text-gray-200">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interactive Floor Plans */}
      {Array.isArray(floorPlans) && floorPlans.length > 0 && (
        <section id="section-floorplans" className="w-full py-12 md:py-16 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-600 mb-8 text-center">Floor Plans</h3>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-600/60 to-transparent" />
            </div>
            
            {/* Floor Plan Tabs */}
            <div className="flex justify-center gap-3 mb-6">
              {floorPlans.map((plan, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFloorIdx(idx)}
                  className={`px-6 py-3 rounded-lg text-sm md:text-base font-semibold border-2 transition-all duration-300 ${
                    activeFloorIdx === idx 
                      ? 'bg-yellow-600 text-white border-yellow-600 shadow-lg' 
                      : 'bg-white dark:bg-gray-900 text-[#181818] dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-yellow-600'
                  }`}
                >
                  {plan.label}
                </button>
              ))}
            </div>

            {/* Floor Plan Image */}
            <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl">
              <img
                src={floorPlans[activeFloorIdx]?.src}
                alt={floorPlans[activeFloorIdx]?.label}
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
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

      {/* Cost Breakdown - commented out per user request; re-enable by restoring `cost && (` */}
      {false && (
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

          {/* Construction timeline removed to simplify the page for customers. */}

      {/* Amenities Section */}
      <section className="w-full py-12 md:py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-600 text-center">Amenities</div>
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-600/60 to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {amenities.map((amenity, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-xl p-6 text-white text-center transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center border border-yellow-600/20"
              >
                <span className="text-yellow-600 text-4xl md:text-5xl block mb-4">{amenity.icon}</span>
                <span className="text-base md:text-lg font-medium block">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connectivity - Nearby (location chips) */}
      {isOngoingVariant && Array.isArray(locationChips) && locationChips.length > 0 && (
        <section className="w-full py-12 md:py-16 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-600 text-center">Connectivity</h3>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-600/60 to-transparent" />
            </div>
            <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
              {locationChips.map((chip, idx) => (
                <span 
                  key={idx} 
                  className="px-6 py-3 rounded-full bg-white dark:bg-gray-900 border-2 border-yellow-600/30 dark:border-gray-700 text-base md:text-lg text-[#181818] dark:text-gray-300 font-medium shadow-md hover:border-yellow-600 hover:shadow-lg transition-all duration-300"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brochure CTA location adjusted later (after Floor Plans) */}

      

      {/* Gallery Section (shared slider + thumbnails) */}
      <section id="section-gallery" className="w-full py-12 md:py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-600 text-center">Gallery</div>
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-600/60 to-transparent" />
          </div>

          {/* Main Image Slider */}
          {hasImages && (
            <div className="rounded-xl overflow-hidden shadow-2xl mb-4 relative aspect-[16/9] max-h-[600px] w-full group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={galleryImages[currentImageIndex]}
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
                    {galleryImages.map((_, idx) => (
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
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-16 w-28 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-gold shadow-lg' : 'border-gray-300 dark:border-gray-700'}`}
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
            images={galleryImages}
            isOpen={isGalleryOpen}
            onClose={() => setGalleryOpen(false)}
          />
        </div>
      </section>

      {/* Location Section */}
      <section id="section-location" className="w-full py-12 md:py-16 bg-gray-50 dark:bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-bold mb-8 text-yellow-600 dark:text-yellow-600 text-center">Location</div>
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-600/60 to-transparent" />
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border-2 border-gold/30 dark:border-gray-700">
              <iframe
                src={embedMapUrl}
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
            <div className="mt-6 text-center">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>Get Directions</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Download Brochure Button - For Ongoing Projects */}
      {isOngoingVariant && brochurePath && (
        <section className="w-full py-12 md:py-16 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-600 dark:text-yellow-600">Download Brochure</h3>
            <p className="text-[#181818] dark:text-gray-400 mb-8 text-lg">Get detailed information about {projectName}</p>
            <a
              href={brochurePath}
              download
              className="inline-flex items-center gap-3 bg-yellow-600 hover:bg-yellow-600/90 text-white px-10 py-5 rounded-lg transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Brochure</span>
            </a>
          </div>
        </section>
      )}

      {/* No sticky CTA for clean minimal layout */}
    </div>
  );
};

export default ProjectTemplate;
