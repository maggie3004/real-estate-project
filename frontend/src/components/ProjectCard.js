import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="project-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="relative h-48">
        <img 
          src={project.image} 
          alt={project.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            project.status === 'Upcoming' ? 'bg-blue-100 text-blue-600' :
            project.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-600' :
            'bg-green-100 text-green-600'
          }`}>
            {project.status}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{project.location}</p>
        <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>
        <button
          onClick={() => navigate(`/projects/${project.id}`)}
          className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          View Details
        </button>
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
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectCard;
