import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay, FaMapMarkerAlt, FaRoad, FaBuilding, FaCompass, FaSun, FaLeaf } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import ImageGallery from './ImageGallery';
import FloatingCallButton from './FloatingCallButton';

const ProjectTemplate = ({
  projectName,
  tagline,
  heroSubtitle,
  description,
  stats,
  amenities,
  images,
  galleryImages: customGalleryImages,
  brochurePath,
  mapUrl,
  directionsUrl,
  mapEmbed,
  reraNumber,
  reraQr,
  reraUrl,
  layoutVariant,
  configuration,
  location,
  progressStage,
  locationChips,
  floorPlans,
  virtualTours,
  downloads,
  advantages,
  testimonials,
  cost,
  connectivityData,
  legalEntity,
}) => {
  // Initialize state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [activeFloorIdx, setActiveFloorIdx] = useState(0);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [activeVirtualTourIdx, setActiveVirtualTourIdx] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);


  // Determine variant and gallery images early so navigation can depend on gallery length
  const isOngoingVariant = layoutVariant === 'ongoing' || Boolean(reraNumber);
  // Prepare gallery images: use custom galleryImages if provided (only those, nothing else), otherwise use floorPlans for ongoing or images
  const galleryImages = customGalleryImages && Array.isArray(customGalleryImages) && customGalleryImages.length > 0
    ? customGalleryImages
    : (isOngoingVariant && Array.isArray(floorPlans) && floorPlans.length > 0)
      ? floorPlans.map(fp => fp.src).filter(Boolean)
      : images;
  const hasImages = Array.isArray(galleryImages) && galleryImages.length > 0;
  const filteredDownloads = Array.isArray(downloads)
    ? downloads.filter(doc => doc && doc.href !== brochurePath && !(doc.label && doc.label.toLowerCase().includes('brochure')))
    : [];

  // Convert Google Maps sharing URL to embed URL
  const getEmbedUrl = (url) => {
    // If mapEmbed is provided, extract the src from it
    if (mapEmbed) {
      const srcMatch = mapEmbed.match(/src="([^"]+)"/);
      if (srcMatch) {
        return srcMatch[1];
      }
    }

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
    const currentItem = galleryImages[currentImageIndex];
    const isVideo = typeof currentItem === 'string' && currentItem.toLowerCase().split('?')[0].toLowerCase().endsWith('.mp4');

    if (isPlaying && !isVideo) {
      interval = setInterval(handleNext, 3000);
    } else if (isPlaying && isVideo) {
      // Automatically pause the slideshow when we reach a video
      // so the user can watch it without being interrupted
      setIsPlaying(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, handleNext, currentImageIndex, galleryImages]);

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

  // Prevent body scroll when virtual tour modal is open
  useEffect(() => {
    if (isVirtualTourOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollPosition}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isVirtualTourOpen, scrollPosition]);


  // FloatingActions removed — no-op

  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#181818] dark:text-white transition-colors duration-300">

      {/* Hero Section */}
      {isOngoingVariant ? (
        <section className="project-hero-section relative overflow-hidden" style={{
          width: '100%',
          aspectRatio: '3 / 2',
          minHeight: '70vh',
          position: 'relative',
          margin: 0,
          padding: 0
        }}>
          {Array.isArray(images) && images.length > 0 ? (
            images.length > 1 ? (
              <>
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  effect="fade"
                  fadeEffect={{
                    crossFade: true
                  }}
                  speed={800}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  pagination={{
                    clickable: true,
                    el: '.project-hero-pagination',
                    bulletClass: 'project-hero-pagination-bullet',
                    bulletActiveClass: 'project-hero-pagination-bullet-active'
                  }}
                  loop={images.length > 1}
                  className="project-hero-swiper"
                  style={{ width: '100%', aspectRatio: '3 / 2', minHeight: '70vh', margin: 0, padding: 0 }}
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index} className="relative">
                      <img
                        src={image}
                        alt={`${projectName} hero ${index + 1}`}
                        className="project-hero-image"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center bottom',
                          display: 'block'
                        }}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        onError={(e) => {
                          e.target.src = '/hero-building.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Pagination */}
                <div className="project-hero-pagination absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30"></div>
              </>
            ) : (
              <>
                <img
                  src={images[0]}
                  alt={projectName + ' hero'}
                  className="project-hero-image"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center bottom',
                    display: 'block'
                  }}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.target.src = '/hero-building.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />
              </>
            )
          ) : (
            <>
              <img
                src={images?.[0]}
                alt={projectName + ' hero'}
                className="project-hero-image"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 75%',
                  display: 'block'
                }}
              />
              <div className="absolute inset-0 bg-black/20" />
            </>
          )}

          {/* Project Name - Top Left */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20 max-w-[calc(100%-220px)] sm:max-w-[calc(100%-240px)] md:max-w-[60%]">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-2xl break-words">
              {projectName}
            </h1>

            {/* Tagline and Subtitle - Below Project Name, Left Aligned */}
            <div className="mt-2 md:mt-4">
              <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-white drop-shadow-2xl leading-tight break-words uppercase">
                {tagline}
              </h2>

              {/* Decorative golden line */}
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 my-2 md:my-3 shadow-lg"
                style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
              </div>

              {heroSubtitle && (
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-white drop-shadow-lg font-light tracking-wide break-words"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {heroSubtitle}
                </p>
              )}
            </div>
          </div>


          {/* RERA Info - Top Right */}
          {reraQr && reraNumber && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-20">
              <a
                href={reraUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer hover:scale-105 transition-transform duration-200"
                title="View MahaRERA Project Details"
              >
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-md p-1 sm:p-1.5 shadow-lg border border-white/20 flex flex-col items-center gap-0.5 w-[85px] sm:w-[95px] hover:shadow-xl transition-shadow">
                  {/* QR Code - Top (Larger for scanning) */}
                  <img
                    src={reraQr}
                    alt="MahaRERA QR Code"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                  />

                  {/* Logo and RERA Number - Bottom */}
                  <div className="flex items-center gap-0.5 w-full px-0.5">
                    {/* MahaRERA Logo */}
                    <img
                      src="/assets/maharera-logo.png"
                      alt="MahaRERA"
                      className="w-3 h-3 sm:w-4 sm:h-4 object-contain flex-shrink-0"
                    />

                    {/* RERA Number */}
                    <div className="text-[5px] sm:text-[6px] text-gray-700 dark:text-gray-200 font-mono leading-tight break-all flex-1">
                      {reraNumber}
                    </div>
                  </div>
                </div>
              </a>
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
                  src={projectName === 'Shree Ganesh Heights' ? '/assets/shree-ganesh-heights/gallery/sghfamily.jpeg'
                    : projectName === 'Shree Ganesh Park' ? '/assets/shree-ganesh-park/gallery/sgpfamily.jpeg'
                      : '/family_photo.jpg'}
                  alt="Happy Family"
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                  loading="lazy"
                  decoding="async"
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
                  <p className="text-amber-900 dark:text-amber-100 text-sm md:text-base leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Features Grid - 3x2 */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Feature 1 - Location */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      <FaMapMarkerAlt className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">Most Demanding<br />Location</p>
                  </div>

                  {/* Feature 2 - Road */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      <FaRoad className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">
                      {projectName === 'Shree Ganesh Heights' ? '9 mtr road' : '100 ft wide road'}<br />front
                    </p>
                  </div>

                  {/* Feature 3 - Facilities */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2 relative">
                      <span className="text-white text-xl md:text-2xl font-bold">
                        {projectName === 'Shree Ganesh Heights' ? '8+' : projectName === 'Shree Ganesh Park' ? '10+' : '21'}
                      </span>
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <FaBuilding className="w-2.5 h-2.5 text-amber-700" />
                      </div>
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">Facilities</p>
                  </div>

                  {/* Feature 4 - Vastu */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      <FaCompass className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">Vastu<br />Compliant</p>
                  </div>

                  {/* Feature 5 - Ventilation */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      <FaSun className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">Good Ventilation &<br />Sunlight</p>
                  </div>

                  {/* Feature 6 - G+7 Structure or Sustainable steps */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-700 dark:bg-amber-600 flex items-center justify-center mb-2">
                      {projectName === 'Shree Ganesh Heights' ? (
                        <FaBuilding className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      ) : (
                        <FaLeaf className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      )}
                    </div>
                    <p className="text-amber-900 dark:text-amber-100 text-xs md:text-sm font-semibold leading-tight">
                      {projectName === 'Shree Ganesh Heights' ? 'G+7 Structure' : 'Sustainable steps'}
                    </p>
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
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {floorPlans.map((plan, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFloorIdx(idx)}
                  className={`px-3 py-2 rounded-lg 
        text-[11px] md:text-sm 
        font-semibold leading-tight text-center
        border transition-all duration-300
        ${activeFloorIdx === idx
                      ? 'bg-amber-700 text-white border-amber-700 shadow-md'
                      : 'bg-white dark:bg-gray-900 text-[#181818] dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-amber-700'
                    }`}

                >
                  {plan.label}
                </button>
              ))}
            </div>


            {/* Floor Plan Image - White Container */}
            <div className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-xl flex items-center justify-center aspect-[4/3] w-full max-w-2xl mx-auto">
              <img
                src={floorPlans[activeFloorIdx]?.src}
                alt={floorPlans[activeFloorIdx]?.label}
                className="absolute top-0 left-0 w-full h-full object-contain"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Virtual Tour Section */}
      {Array.isArray(virtualTours) && virtualTours.length > 0 && (
        <section id="section-virtualtour" className="w-full py-12 md:py-16 bg-amber-50 dark:bg-amber-950/20">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-700 dark:text-amber-100 mb-8 text-center">Virtual Tour</h3>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-700/60 to-transparent" />
            </div>

            {/* Virtual Tour Card - Centered, Responsive */}
            <div className="max-w-2xl mx-auto">
              {virtualTours.map((tour, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-amber-700/20 hover:border-amber-700"
                  onClick={() => {
                    // Check if mobile device (screen width < 768px)
                    const isMobile = window.innerWidth < 768;

                    if (isMobile) {
                      // On mobile, open in new tab for better experience
                      window.open(tour.url, '_blank', 'noopener,noreferrer');
                    } else {
                      // On desktop, use modal
                      setScrollPosition(window.scrollY);
                      setActiveVirtualTourIdx(idx);
                      setIsVirtualTourOpen(true);
                    }
                  }}
                >
                  {/* Thumbnail - Responsive aspect ratio */}
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={tour.thumbnail || tour.src || '/assets/virtual-tour-placeholder.jpg'}
                      alt={tour.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Simple Pause Icon Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="transform group-hover:scale-110 transition-all duration-300">
                        {/* Pause Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white drop-shadow-2xl"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <circle cx="12" cy="12" r="10" fill="rgba(180, 83, 9, 0.9)" />
                          <rect x="9" y="8" width="2" height="8" fill="white" rx="1" />
                          <rect x="13" y="8" width="2" height="8" fill="white" rx="1" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 text-center">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-amber-900 dark:text-amber-100 mb-1 sm:mb-2">
                      {tour.label}
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                      <span className="hidden sm:inline">Click to explore 360° view</span>
                      <span className="sm:hidden">Tap to open 360° tour</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Virtual Tour Modal */}
      <AnimatePresence>
        {isVirtualTourOpen && virtualTours && virtualTours[activeVirtualTourIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/* Close Button - Enhanced Visibility */}
            <button
              onClick={() => {
                setIsVirtualTourOpen(false);
                setTimeout(() => {
                  window.scrollTo(0, scrollPosition);
                }, 100);
              }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[10000] p-2 sm:p-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl transition-all duration-200 group border-2 border-white/30"
              aria-label="Close virtual tour"
              style={{ touchAction: 'manipulation' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Tour Label */}
            <div className="absolute top-4 left-4 z-[10000] bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white font-semibold text-sm md:text-base">
                {virtualTours[activeVirtualTourIdx].label}
              </p>
            </div>

            {/* Navigation Arrows (if multiple tours) */}
            {virtualTours.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVirtualTourIdx((prev) => (prev - 1 + virtualTours.length) % virtualTours.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-200"
                  aria-label="Previous tour"
                >
                  <FaChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVirtualTourIdx((prev) => (prev + 1) % virtualTours.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-200"
                  aria-label="Next tour"
                >
                  <FaChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* iFrame Container - Desktop Only */}
            <div className="w-full h-full">
              <iframe
                src={virtualTours[activeVirtualTourIdx].url}
                className="w-full h-full border-0"
                allowFullScreen
                allow="accelerometer; gyroscope; vr; xr; xr-spatial-tracking"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Virtual Tour - ${virtualTours[activeVirtualTourIdx].label}`}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        <section id="section-connectivity" className="w-full py-16 md:py-20 bg-white dark:bg-black/50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4 text-center">
              Connectivity
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-700 to-amber-600 mx-auto mb-12"></div>

            {/* Connectivity Description Lines */}
            {connectivityData?.description && (
              <div className="max-w-4xl mx-auto mb-12">
                <ul className="space-y-3">
                  {connectivityData.description.map((line, index) => (
                    <li key={index} className="flex items-center justify-center gap-3">
                      <span className="text-amber-700 dark:text-amber-400 mt-1 flex-shrink-0">•</span>
                      <p className="text-amber-900 dark:text-amber-100 text-base md:text-lg leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: line }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Connectivity Points - Icon Grid */}
            {connectivityData?.points && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto place-items-center">


                {connectivityData.points.map((point, index) => {
                  const Icon = point.icon;

                  return (
                    <div key={index} className="flex flex-col items-center justify-start text-center w-full">

                      {/* Icon Circle */}
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full 
                       bg-amber-700 text-white 
                       flex items-center justify-center 
                       mb-3"
                      >
                        {Icon && <Icon className="text-xl md:text-2xl" />}
                      </div>

                      {/* Label */}
                      <div className="text-xs md:text-sm font-semibold text-amber-900 dark:text-amber-100 leading-tight mb-1 px-1">
                        {point.label}
                      </div>

                      {/* Time */}
                      <div className="text-[10px] md:text-xs text-amber-700 dark:text-amber-300">
                        {point.time}
                      </div>

                    </div>
                  );
                })}

              </div>
            )}





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
            <div className="rounded-xl overflow-hidden shadow-2xl mb-4 relative aspect-[16/9] max-h-[600px] w-full group bg-amber-50/50 dark:bg-gray-900/30">
              <AnimatePresence mode="wait">
                {(() => {
                  const currentItem = galleryImages[currentImageIndex];
                  const isVideo = typeof currentItem === 'string' && currentItem.toLowerCase().endsWith('.mp4');

                  if (isVideo) {
                    return (
                      <div key={currentImageIndex} className="w-full h-full relative" style={{ zIndex: 20 }}>
                        <video
                          className="w-full h-full object-contain"
                          controls
                          playsInline
                          preload="auto"
                          controlsList="nodownload"
                          style={{ backgroundColor: 'black', position: 'relative', zIndex: 20 }}
                          onError={(e) => {
                            console.error('Video playback error:', e);
                            console.log('Video source:', currentItem);
                          }}
                        >
                          <source src={currentItem} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    );
                  }

                  return (
                    <motion.img
                      key={currentImageIndex}
                      src={currentItem}
                      alt={`${projectName} Slide ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                    />
                  );
                })()}
              </AnimatePresence>

              {/* Navigation Arrows - Hidden when video is displayed */}
              {!(() => {
                const currentItem = galleryImages[currentImageIndex];
                return typeof currentItem === 'string' && currentItem.toLowerCase().endsWith('.mp4');
              })() && (
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ zIndex: 10 }}>
                    <button
                      onClick={handlePrevious}
                      className="p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      aria-label="Previous slide"
                    >
                      <FaChevronLeft size={32} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      aria-label="Next slide"
                    >
                      <FaChevronRight size={32} />
                    </button>
                  </div>
                )}

              {/* Controls and Progress - Hidden when video is displayed */}
              {!(() => {
                const currentItem = galleryImages[currentImageIndex];
                return typeof currentItem === 'string' && currentItem.toLowerCase().endsWith('.mp4');
              })() && (
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent" style={{ zIndex: 10 }}>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={togglePlayPause}
                        className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                      >
                        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                      </button>
                      <div className="flex gap-1.5">
                        {galleryImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex
                              ? 'bg-amber-500 w-4'
                              : 'bg-white/60 hover:bg-white/90'
                              }`}
                            style={{ minWidth: 0, minHeight: 0 }}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Filmstrip Thumbnails */}
          {hasImages && (
            <div className="relative overflow-hidden">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1" onMouseEnter={(e) => { e.currentTarget.scrollLeft += 0; }}>
                {galleryImages.map((img, idx) => {
                  const isVideo = typeof img === 'string' && img.toLowerCase().endsWith('.mp4');
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative h-16 w-28 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-amber-600 shadow-lg' : 'border-gray-300 dark:border-gray-700'}`}
                      title={`Slide ${idx + 1}`}
                    >
                      {isVideo ? (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
                          <video src={img} className="w-full h-full object-cover opacity-60" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FaPlay className="text-white text-xl drop-shadow-lg" />
                          </div>
                        </div>
                      ) : (
                        <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      )}
                    </button>
                  );
                })}
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
                loading="eager"
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

      {/* Legal Entity Disclaimer */}
      {legalEntity && (
        <section className="w-full py-8 border-t border-gray-100 dark:border-gray-900 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <p className="text-[#181818] dark:text-gray-200 text-lg md:text-xl font-bold tracking-tight">
                {legalEntity}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Floating Call Button with Download - Only for Ongoing Projects */}
      {isOngoingVariant && <FloatingCallButton brochurePath={brochurePath} projectName={projectName} isOngoing={isOngoingVariant} />}

      {/* No sticky CTA for clean minimal layout */}

      {/* Project Hero Carousel Styles */}
      <style>{`
        .project-hero-section {
          width: 100% !important;
          aspect-ratio: 3 / 2 !important;
          min-height: 70vh !important;
          position: relative !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .project-hero-swiper {
          width: 100% !important;
          aspect-ratio: 3 / 2 !important;
          min-height: 70vh !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .project-hero-swiper .swiper-slide {
          width: 100% !important;
          aspect-ratio: 3 / 2 !important;
          min-height: 70vh !important;
          position: relative !important;
        }
        
        .project-hero-swiper .swiper-slide > div {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
          overflow: hidden !important;
        }
        
        /* Ensure hero image fits perfectly on all devices */
        .project-hero-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center bottom !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          display: block !important;
        }
        
        .project-hero-pagination-bullet {
          width: 6px;
          height: 6px;
          min-width: 0 !important;
          min-height: 0 !important;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          border-radius: 3px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        @media (min-width: 640px) {
          .project-hero-pagination-bullet {
            width: 10px;
            height: 10px;
            border-radius: 5px;
          }
        }
        
        .project-hero-pagination-bullet-active {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
        }
        
        .project-hero-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }
        
        /* Smooth transitions for all slides */
        .project-hero-swiper .swiper-slide {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        
        .project-hero-swiper .swiper-slide-active {
          opacity: 1;
        }
        
        .project-hero-swiper .swiper-slide-prev,
        .project-hero-swiper .swiper-slide-next {
          opacity: 0;
        }
        
        /* Dark mode adjustments */
        .dark .project-hero-pagination-bullet {
          background: rgba(156, 163, 175, 0.5);
        }
        
        .dark .project-hero-pagination-bullet-active {
          background: rgba(156, 163, 175, 1);
        }
        
        .dark .project-hero-pagination-bullet:hover {
          background: rgba(156, 163, 175, 0.8);
        }
      `}</style>
    </div>
  );
};

export default ProjectTemplate;
