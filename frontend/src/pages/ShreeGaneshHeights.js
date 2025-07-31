import React, { useState, useEffect } from 'react';
import { FaCar, FaSun, FaBuilding, FaShieldAlt, FaExpand, FaChevronLeft, FaChevronRight, FaPause, FaPlay, FaArrowCircleUp, FaWater, FaTint } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { BiCctv, BiSolidHomeHeart } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
// Update these imports
import FloatingActions from '../components/FloatingActions';
import ImageGallery from '../components/ImageGallery';

const amenities = [
  { name: 'CCTV', icon: <BiCctv /> },
  { name: 'Solar Power', icon: <FaSun /> },
  { name: 'Safety Gate', icon: <BiSolidHomeHeart /> },
  { name: 'Multipurpose Hall', icon: <MdMeetingRoom /> },
  { name: 'Auto Door Lift', icon: <FaArrowCircleUp /> },
  { name: 'Battery Backup', icon: <FaBuilding /> },
  { name: 'Smart Automation', icon: <FaShieldAlt /> },
  { name: 'Water Supply', icon: <FaWater /> },
  { name: 'Parking Space', icon: <FaCar /> },
  { name: 'Rain Harvesting', icon: <FaTint /> },
];

const images = [
  '/shree-ganesh-heights/Screenshot_29-7-2025_224644_.jpeg',
  '/shree-ganesh-heights/Screenshot_29-7-2025_224654_.jpeg',
  '/shree-ganesh-heights/Screenshot_29-7-2025_224727_.jpeg',
  '/shree-ganesh-heights/Screenshot_29-7-2025_22474_.jpeg'
];

const ShreeGaneshHeights = () => {
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const projectName = 'Shree Ganesh Heights';
  const tagline = 'Experience Essence of Elevated Living...';

  // Auto-advance slideshow
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  // Function to safely send analytics
  const sendAnalytics = async (data) => {
    try {
      const response = await fetch('/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        console.warn('Analytics request failed silently');
      }
    } catch (error) {
      console.warn('Analytics request failed silently');
    }
  };

  const handleDownloadBrochure = () => {
    try {
      window.open('/Shri Ganesh Heights.pdf', '_blank');
      // Send analytics event
      sendAnalytics({
        event: 'brochure_download',
        propertyName: projectName
      });
    } catch (error) {
      console.error('Error opening brochure:', error);
      alert('Unable to open the brochure. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
      <FloatingActions 
        brochurePath="/Shri Ganesh Heights.pdf"
        projectName={projectName}
      />
      {/* Header Section */}
      <section className="w-full py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gold text-center">{projectName}</h1>
          <div className="text-base md:text-lg text-gold/90 mb-8 text-center">{tagline}</div>
          

          
          {/* Description */}
          <div className="grid">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-gray-200 text-base md:text-lg leading-relaxed text-justify">
                Experience an elevated lifestyle of sophistication at Shree Ganesh Heights, where every aspect is meticulously designed. 1 BHK 'Happy Homes' crafted to enhance your everyday living. These residences offer the perfect integration of luxury and functionality, delivering a modern living experience that seamlessly blends convenience, comfort, and innovation. Strategically located in the highly desirable Pathardi Shivar, Nashik, Shree Ganesh Heights provides unmatched connectivity to essential services and amenities. With schools, shopping centers, healthcare facilities, and recreational options all within close proximity, residents enjoy a seamless, well-rounded living experience.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-8 bg-gray-900/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-xl md:text-2xl font-bold text-gold mb-1">1 BHK</div>
              <div className="text-lg md:text-xl text-gray-200">Happy Homes</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-xl md:text-2xl font-bold text-gold mb-2">G+7</div>
              <div className="text-lg md:text-xl text-gray-200">Structure</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold text-gold mb-2">8+</div>
              <div className="text-xl text-gray-200">Facilities</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold text-gold mb-2">Premium</div>
              <div className="text-xl text-gray-200">Location</div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="w-full py-8 bg-gray-900/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-semibold mb-8 text-gold text-center">Amenities</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {amenities.map((a, idx) => (
              <div key={a.name} className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg text-white text-center transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                <span className="text-gold text-3xl md:text-4xl block mb-3 md:mb-4">{a.icon}</span>
                <span className="text-lg md:text-xl font-medium block">{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full py-12 bg-gray-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-semibold mb-12 text-gold text-center">Gallery</div>
        
          {/* Slideshow */}
          <div className="rounded-xl overflow-hidden shadow-lg mb-6 relative aspect-[16/9] max-h-[600px] w-full group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${projectName} Slide ${currentImageIndex + 1}`}
                className="w-full h-full object-contain bg-gray-900"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Slideshow Controls */}
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

            {/* Play/Pause and Progress Indicators */}
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

          {/* Thumbnails Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
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
                  className={`rounded-lg aspect-[4/3] w-full object-cover transition-all duration-300 group-hover:scale-110 ${
                    idx === currentImageIndex ? 'ring-2 ring-gold' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Full Screen Gallery Modal */}
          <ImageGallery
            images={images}
            isOpen={isGalleryOpen}
            onClose={() => setGalleryOpen(false)}
          />
        </div>
      </section>

      {/* Location Map Section */}
      <section className="w-full py-8 bg-gray-900/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-2xl md:text-3xl font-semibold mb-8 text-gold text-center">Location</div>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.83755183644724!2d73.76418700000002!3d19.9583632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebb3dcd6bb77%3A0xdbd96eb95feb12f7!2sShree%20ganesh%20heights%20B!5e0!3m2!1sen!2sin!4v1690727433396!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shree Ganesh Heights Location"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://www.google.com/maps/dir//Shree+ganesh+heights+B/@19.9583632,73.7635915,103m"
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

    </div>
  );
};

export default ShreeGaneshHeights;