import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProjectCarousel = ({ title, projects }) => {
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  
  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
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
              className="p-2 rounded-full bg-gray-100 hover:bg-gold hover:text-white transition-colors"
              aria-label="Previous projects"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextClick}
              className="p-2 rounded-full bg-gray-100 hover:bg-gold hover:text-white transition-colors"
              aria-label="Next projects"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <motion.div
          ref={carouselRef}
          className="overflow-x-scroll hide-scrollbar"
          whileTap={{ cursor: "grabbing" }}
        >
          <div 
            className="flex gap-6 min-w-max pb-4"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
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
