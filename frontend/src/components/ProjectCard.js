import React from 'react';
import { FaDownload, FaMapMarkerAlt } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const gallery = Array.isArray(project?.images) && project.images.length > 0
    ? project.images.slice(0, 3)
    : [project?.image || '/assets/shree-ganesh-srushti/gallery/front.jpg'];

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Gallery */}
      <div className="w-full h-48 grid grid-cols-3 gap-0">
        {gallery.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={(project?.name || 'Project') + ' image ' + (idx + 1)}
            className="w-full h-48 object-cover first:col-span-2"
          />
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {project?.name || 'Project Name'}
        </h3>
        <div className="text-sm text-gray-600 mb-2">
          {project?.configuration && (
            <span className="mr-3">{project.configuration}</span>
          )}
          <span className="inline-flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-1" /> {project?.location || 'Location'}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project?.description || 'Project description'}
        </p>
        <div className="flex items-center justify-between">
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            {project?.status || 'Status'}
          </span>

          {project?.brochureUrl && (
            <a
              href={project.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-yellow-500 text-white transition-colors duration-200 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <FaDownload className="mr-2" /> Download Brochure
            </a>
          )}
        </div>
      </div>

      {/* RERA badge */}
      {(project?.reraNumber || project?.reraQr) && (
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-md p-2 flex items-center gap-2 shadow-sm">
          {project?.reraQr && (
            <img src={project.reraQr} alt="MahaRERA QR" className="w-10 h-10 object-contain" />
          )}
          {project?.reraNumber && (
            <div className="text-[10px] leading-tight text-gray-700">
              <div className="font-semibold">MahaRERA</div>
              <div>No: {project.reraNumber}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
