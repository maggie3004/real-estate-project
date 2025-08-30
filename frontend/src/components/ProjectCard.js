import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const { id, name, description, status, location, image } = project;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'bg-red-100 text-red-800';
      case 'ongoing':
        return 'bg-gold-100 text-gold-800';
      case 'completed':
        return 'bg-gold-100 text-gold-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-[#FFD700]">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.toLowerCase() === 'ongoing' ? 'bg-[#FFD700] text-black' : status.toLowerCase() === 'completed' ? 'bg-[#B22222] text-white' : 'bg-gray-200 text-black'}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-black mb-2">{name}</h3>
        <p className="text-[#FFD700] mb-2 font-medium">{location}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>
        <Link 
          to={`/project/${id}`}
          className="inline-block bg-[#B22222] text-white px-6 py-2 rounded-md border-2 border-[#B22222] hover:bg-[#FFD700] hover:text-[#B22222] hover:border-[#FFD700] transition-colors duration-200 font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
