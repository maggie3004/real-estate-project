import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProjectCarousel = ({ title, projects }) => {
  const { useState, useRef, useEffect } = React;
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const carouselRef = useRef(null);
  
  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScroll = () => {
    checkScrollButtons();
  };

  useEffect(() => {
    if (carouselRef.current) {
      checkScrollButtons();
      carouselRef.current.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', checkScrollButtons);
      
      return () => {
        carouselRef.current?.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [projects]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction * 320,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevClick = () => scroll(-1);
  const handleNextClick = () => scroll(1);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevClick();
    } else if (e.key === 'ArrowRight') {
      handleNextClick();
    }
  };

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrevClick}
              className={`p-2 rounded-full transition-colors ${
                canScrollLeft 
                  ? 'bg-gray-100 hover:bg-gold hover:text-white' 
                  : 'bg-gray-50 text-gray-300 cursor-not-allowed'
              }`}
              disabled={!canScrollLeft}
              aria-label="Previous projects"
              aria-disabled={!canScrollLeft}
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextClick}
              className={`p-2 rounded-full transition-colors ${
                canScrollRight 
                  ? 'bg-gray-100 hover:bg-gold hover:text-white' 
                  : 'bg-gray-50 text-gray-300 cursor-not-allowed'
              }`}
              disabled={!canScrollRight}
              aria-label="Next projects"
              aria-disabled={!canScrollRight}
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <motion.div
          ref={carouselRef}
          className="overflow-x-scroll hide-scrollbar"
          whileTap={{ cursor: "grabbing" }}
          onScroll={handleScroll}
          tabIndex={0}
          role="region"
          aria-label={`${title} carousel`}
          onKeyDown={handleKeyDown}
        >
          <div 
            className="flex gap-6 min-w-max pb-4"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchCancel={() => setIsDragging(false)}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {projects.map((project) => (
              <div key={project.id} className="w-[300px] flex-shrink-0">
                {React.createElement(project.component, { project })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

ProjectCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
    })
  ).isRequired,
};

export default ProjectCarousel;

// Add custom styles to hide scrollbar but keep functionality
const styles = document.createElement('style');
styles.textContent = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(styles);
