import React from "react";
import { FaDownload, FaMapMarkerAlt } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const gallery =
    Array.isArray(project?.images) && project.images.length > 0
      ? project.images.slice(0, 3)
      : [project?.image || "/assets/shree-ganesh-srushti/gallery/front.jpg"];

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      {/* Gallery */}
      <div className="w-full h-48 grid grid-cols-3">
        {gallery.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${project?.name || "Project"} image ${idx + 1}`}
            className={`w-full h-48 object-cover ${
              idx === 0 ? "col-span-2" : ""
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {project?.name || "Project Name"}
        </h3>

        <div className="text-sm text-gray-600 mb-2 flex flex-wrap items-center gap-3">
          {project?.configuration && (
            <span>{project.configuration}</span>
          )}

          <span className="inline-flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-1" />
            {project?.location || "Location"}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project?.description || "Project description"}
        </p>

        <div className="flex items-center justify-between">
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            {project?.status || "Status"}
          </span>

          {project?.brochureUrl && (
            <a
              href={project.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-yellow-500 text-white transition hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <FaDownload className="mr-2" />
              Download Brochure
            </a>
          )}
        </div>
      </div>

      {/* RERA Badge */}
      {(project?.reraNumber || project?.reraQr) && (
        <div
          className="
            absolute bottom-2 right-2
            bg-white/80 group-hover:bg-white/95
            dark:bg-gray-900/80 dark:group-hover:bg-gray-900/95
            backdrop-blur-sm
            border border-gray-200 dark:border-gray-700
            rounded-md
            px-1 py-0.5
            inline-flex items-center gap-1
            shadow-sm
            transition
          "
        >
          {project?.reraQr && (
            <img
              src={project.reraQr}
              alt="MahaRERA QR"
              className="w-8 h-8 object-contain"
            />
          )}

          {project?.reraNumber && (
            <div className="text-[9px] leading-none text-gray-700 dark:text-gray-300">
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
