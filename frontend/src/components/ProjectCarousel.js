import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectCarousel = ({ projects = [] }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      {projects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No projects available at the moment.
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
