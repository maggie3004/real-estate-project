import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  FaMapMarkerAlt, FaRegBookmark, FaBookmark, FaCalendar, FaChartLine,
  FaShareAlt, FaRupeeSign, FaImages, FaCheck
} from 'react-icons/fa';
import ImageGallery from './ImageGallery';

const ProjectCard = ({ project, onToggleFavorite, isFavorite, onShare, isLoading }) => {
  const navigate = useNavigate();
  const [isGalleryOpen, setGalleryOpen] = useState(false);

  // Calculate status color classes
  const getStatusColors = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Ongoing':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'Completed':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="project-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative group">
      {/* Favorite Button */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(project.id);
          }}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <FaBookmark className="w-5 h-5 text-gold" />
          ) : (
            <FaRegBookmark className="w-5 h-5 text-gray-600" />
          )}
        </button>
      )}

      <div className="relative h-48">
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          <>
            <img 
              src={project.thumbnailImage} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
            {project.images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
                <FaImages className="w-4 h-4" />
                <span>{project.images.length}</span>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColors(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            {/* View Gallery button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGalleryOpen(true);
              }}
              className="absolute bottom-4 left-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              aria-label="View gallery"
            >
              <FaImages className="w-4 h-4 text-gray-600" />
            </button>

            {/* Share button */}
            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(project);
                }}
                className="absolute bottom-4 left-14 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Share project"
              >
                <FaShareAlt className="w-4 h-4 text-gray-600" />
              </button>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Image Gallery */}
            <ImageGallery
              images={project.images}
              isOpen={isGalleryOpen}
              onClose={() => setGalleryOpen(false)}
            />
          </>
        )}
      </div>

      <div className="p-5">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
            
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span>{project.location}</span>
            </div>

            {project.priceRange && (
              <div className="flex items-center gap-2 text-gray-800 font-medium mb-3">
                <FaRupeeSign className="w-4 h-4" />
                <span>{project.priceRange}</span>
              </div>
            )}

            {project.completionDate && (
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                <FaCalendar className="w-4 h-4" />
                <span>Expected completion: {project.completionDate}</span>
              </div>
            )}

            {project.status === 'Ongoing' && project.progress && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600 flex items-center gap-1">
                    <FaChartLine className="w-4 h-4" />
                    Progress
                  </span>
                  <span className="font-semibold text-gold">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-gold rounded-full transition-all duration-500" 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Key Features/Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-4">
                <ul className="grid grid-cols-2 gap-2">
                  {project.highlights.slice(0, 4).map((highlight, index) => (
                    <li key={index} className="flex items-center gap-1 text-sm text-gray-600">
                      <FaCheck className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="truncate">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>
            
            <button
              onClick={() => navigate(`/projects/${project.id}`)}
              className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              aria-label={`View details for ${project.name}`}
            >
              View Details
            </button>
          </>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['Upcoming', 'Ongoing', 'Completed']).isRequired,
    location: PropTypes.string.isRequired,
    thumbnailImage: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    completionDate: PropTypes.string,
    progress: PropTypes.number,
    priceRange: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onToggleFavorite: PropTypes.func,
  onShare: PropTypes.func,
  isFavorite: PropTypes.bool,
  isLoading: PropTypes.bool
};

ProjectCard.defaultProps = {
  onToggleFavorite: null,
  onShare: null,
  isFavorite: false,
  isLoading: false
};

export default ProjectCard;
