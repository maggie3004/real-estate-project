import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={project?.image || '/assets/shree-ganesh-srushti/gallery/front.jpg'} 
        alt={project?.name || 'Project'} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {project?.name || 'Project Name'}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {project?.description || 'Project description'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{project?.location || 'Location'}</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs rounded-full">
            {project?.status || 'Status'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
