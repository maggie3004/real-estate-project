import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import ImageGallery from './ImageGallery';

const ProjectTemplate = ({ 
  projectName,
  tagline,
  heroSubtitle,
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
    if (url.includes('output=embed')) return url;
    
    // For Shree Ganesh Srushti specifically, use the proper embed URL with coordinates
    if (projectName && projectName.includes('Shree Ganesh Srushti')) {
      return 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1468.5434705561454!2d73.71793980264566!3d19.97502097522695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1762979312940!5m2!1sen!2sin';
    }
    
    // If it's a sharing link (maps.app.goo.gl), try to create embed URL with address
    if (url.includes('maps.app.goo.gl') || url.includes('goo.gl')) {
      const query = encodeURIComponent(`${projectName}, ${location || 'Nashik'}`);
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
        <section className="relative w-full h-screen md:h-[85vh] lg:h-[90vh] overflow-hidden bg-black flex items-center justify-center">
          <img 
            src={images?.[0]}
            alt={projectName + ' hero'}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Project Name - Top Left */}
          <div className="absolute top-6 md:top-8 left-6 md:left-8 z-20">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-2xl">
              {projectName}
            </h1>
            
            {/* Tagline and Subtitle - Below Project Name, Left Aligned */}
            <div className="mt-2 md:mt-4">
              <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-white drop-shadow-2xl leading-tight">
                {tagline}
              </h2>
              {heroSubtitle && (
                <p className="text-xs md:text-base lg:text-lg text-white drop-shadow-lg font-medium mt-1 md:mt-2">
                  {heroSubtitle}
                </p>
              )}
            </div>
          </div>

          {/* RERA Info - Top Right */}
          {reraQr && reraNumber && (
            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
              <div className="flex items-center gap-2">
                <img 
                  src={reraQr} 
                  alt="MahaRERA Logo" 
                  className="w-12 h-12 md:w-14 md:h-14 object-contain"
                />
                <div className="text-left">
                  <div className="text-xs font-semibold text-white drop-shadow-lg">RERA</div>
                  <div className="text-xs text-white drop-shadow-lg font-mono leading-tight">{reraNumber}</div>
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
                <div key={index} className="bg-white dark:bg-gray-900 border border-amber-700/30 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="text-lg md:text-xl font-semibold text-amber-700 mb-1">{stat.title}</div>
                  <div className="text-base md:text-lg text-[#181818] dark:text-gray-300">{stat.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      

      {/* About Section (shows short summary with read more) */}
      {isOngoingVariant && (
        <section id="section-about" className="w-full py-16 md:py-20 bg-amber-50 dark:bg-amber-950/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Family Photo - Left Side (Desktop), Bottom (Mobile) */}
              <div className="w-full order-2 md:order-1">
                <img 
                  src="/family_photo.jpg" 
                  alt="Happy Family" 
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                />
              </div>

              {/* Content - Right Side (Desktop), Top (Mobile) */}
              <div className="w-full order-1 md:order-2">
                {/* Section Title */}
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-1">
                    THE BENCHMARK FOR A
                  </h2>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                    NEW ERA OF LIVING
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-700 to-amber-600"></div>
                </div>

                {/* Description Text */}
                <div className="mb-8">
                  <p className="text-amber-900 dark:text-amber-100 text-sm md:text-base leading-relaxed mb-2">
                    Shree Ganesh Srushti offers spacious 1,2 & 3 BHK residences
                  </p>
                  <p className="text-amber-900 dark:text-amber-100 text-sm md:text-base leading-relaxed mb-2">
                    Thoughtfully designed towers ensure ample light, ventilation, and scenic views
                  </p>
                  <p className="text-amber-900 dark:text-amber-100 text-sm md:text-base leading-relaxed font-semibold mb-2">
                    — creating a lifestyle of comfort, convenience, and class.
                  </p>
                </div>

                {/* Features Grid - 3x2 */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Feature 1 - Location */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C7.58 2 4 5.58 4 10c0 6 8 12 8 12s8-6 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                      </svg>
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">Most Demanding<br/>Location</p>
                  </div>

                  {/* Feature 2 - Road */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
                      </svg>
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">100 ft wide road<br/>front</p>
                  </div>

                  {/* Feature 3 - Facilities */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-4h2v18h-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14M3 5l9-3 9 3" />
                      </svg>
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">Facilities</p>
                  </div>

                  {/* Feature 4 - Vastu */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 8v8c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V8l-9-6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l3 3 5-6" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h4m0 4h-4m2 4v2m0-4v-2" />
                      </svg>
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">Vastu<br/>Compliant</p>
                  </div>

                  {/* Feature 5 - Ventilation */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-9-9h18M6 12a6 6 0 1112 0 6 6 0 01-12 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
                      </svg>
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">Good Ventilation &<br/>Sunlight</p>
                  </div>

                  {/* Feature 6 - Sustainability */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" />
                      </svg>
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">Sustainable steps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Note: brochure CTA moved to after Floor Plans for ongoing pages to keep a single CTA */}

      {/* Interactive Floor Plans */}
      {Array.isArray(floorPlans) && floorPlans.length > 0 && (
        <section id="section-floorplans" className="w-full py-12 md:py-16 bg-white dark:bg-black/50">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-700 dark:text-amber-100 mb-8 text-center">Floor Plans</h3>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-700/60 to-transparent" />
            </div>
            
            {/* Floor Plan Tabs */}
            <div className="flex justify-center gap-3 mb-6">
              {floorPlans.map((plan, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFloorIdx(idx)}
                  className={`px-6 py-3 rounded-lg text-sm md:text-base font-semibold border-2 transition-all duration-300 ${
                    activeFloorIdx === idx 
                      ? 'bg-amber-700 text-white border-amber-700 shadow-lg' 
                      : 'bg-white dark:bg-gray-900 text-[#181818] dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-amber-700'
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
        <section id="section-downloads" className="w-full py-10 bg-amber-50 dark:bg-amber-950/20">
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
        <section className="w-full py-10 bg-white dark:bg-black/50">
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
      <section className="w-full py-12 md:py-16 bg-amber-50 dark:bg-amber-950/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-bold mb-8 text-amber-700 dark:text-amber-100 text-center">Amenities</div>
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-700/60 to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {amenities.map((amenity, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-xl p-6 text-white text-center transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center border border-amber-700/20"
              >
                <span className="text-amber-700 text-4xl md:text-5xl block mb-4">{amenity.icon}</span>
                <span className="text-base md:text-lg font-medium block">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connectivity Section - New Detailed Version */}
      {isOngoingVariant && (
        <section className="w-full py-16 md:py-20 bg-white dark:bg-black/50">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4 text-center">
              Connectivity
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-700 to-amber-600 mx-auto mb-12"></div>

            {/* Connectivity Points - List */}
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-amber-900 dark:text-amber-100 text-base md:text-lg leading-relaxed mb-4">
                <span className="font-bold">1. Strategically located near <span className="text-amber-800 dark:text-amber-200">Datta Mandir Chowk</span></span>, offering excellent connectivity.
              </p>
              <p className="text-amber-900 dark:text-amber-100 text-base md:text-lg leading-relaxed mb-4">
                <span className="font-bold">2. Quick access to <span className="text-amber-800 dark:text-amber-200">Trimbakeshwar Road</span></span> ensuring smooth travel to key city areas.
              </p>
              <p className="text-amber-900 dark:text-amber-100 text-base md:text-lg leading-relaxed">
                <span className="font-bold">3. Well-connectivity leading to nearby <span className="text-amber-800 dark:text-amber-200">residential and commercial hubs</span></span>.
              </p>
            </div>

            {/* Connectivity Icons Grid - 6 items */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
              {/* Bus Stop */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M18 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M20 8h-3V4c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v4H4c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h1v2c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-2h8v2c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-2h1c.55 0 1-.45 1-1v-7c0-.55-.45-1-1-1zm-8-3h4v3h-4V5zm.5 9c-.83 0-1.5-.67-1.5-1.5S10.67 10 11.5 10s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm6 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                </div>
                <p className="text-amber-900 dark:text-amber-100 font-semibold text-xs md:text-sm">Bus stop 3 mins<br/>& CBS in 13 min</p>
              </div>

              {/* Factory/MIDC */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M13 13h-2v8h2zm4-8h2V3h-2zm4 4h2V7h-2zM6 13H4v8h2zm6-11h2V2h-2zm6 11h2v8h-2z" />
                    <path d="M12 6l-5 4v9h10v-9z" />
                  </svg>
                </div>
                <p className="text-amber-900 dark:text-amber-100 font-semibold text-xs md:text-sm">Satpur Ambad<br/>MIDC 6 mins</p>
              </div>

              {/* Market */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </div>
                <p className="text-amber-900 dark:text-amber-100 font-semibold text-xs md:text-sm">Market<br/>5 mins</p>
              </div>

              {/* Highway */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 12l1.5-4.5h11L19 12H5z" />
                  </svg>
                </div>
                <p className="text-amber-900 dark:text-amber-100 font-semibold text-xs md:text-sm">Trimbak & Mumbai<br/>highway 7 mins</p>
              </div>

              {/* Hospitals & Schools */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5h3.5V16h-3.5zm0-5H16V11h-2.5zM9 16H5.5v-3.5H9zm0-5H5.5V7.5H9z" />
                  </svg>
                </div>
                <p className="text-amber-900 dark:text-amber-100 font-semibold text-xs md:text-sm">Hospitals &<br/>Schools 6 mins</p>
              </div>

              {/* City Centre Mall */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M15 21H9v-5.25c0-.41.34-.75.75-.75h4.5c.41 0 .75.34.75.75V21zm6-8.5H3l.29-2.04c.15-1.03.79-1.92 1.75-2.38V4h14v4.08c.96.46 1.6 1.35 1.75 2.38l.29 2.04zM20 4h-1V3c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v1H9V3c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <p className="text-amber-900 dark:text-amber-100 font-semibold text-xs md:text-sm">City centre<br/>mall 10 mins</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brochure CTA location adjusted later (after Floor Plans) */}

      

      {/* Gallery Section (shared slider + thumbnails) */}
      <section id="section-gallery" className="w-full py-12 md:py-16 bg-amber-50 dark:bg-amber-950/20">
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
      <section id="section-location" className="w-full py-12 md:py-16 bg-white dark:bg-black/50">
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
        <section className="w-full py-12 md:py-16 bg-amber-50 dark:bg-amber-950/20">
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
