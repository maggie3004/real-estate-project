import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

// This should be replaced with data from your backend
const projects = {
  // ... same project data as in Projects.js
};

const ProjectDetail = () => {
  const { id } = useParams();
  
  // Find project from all categories
  const project = [
    ...projects.upcoming,
    ...projects.ongoing,
    ...projects.completed
  ].find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-gold hover:underline">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${project.name} | Ganesh Yeole Builders and Developers`}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.name}</h1>
              <div className="flex flex-wrap gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendar />
                  <span>{project.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">About the Project</h2>
            <p className="text-gray-700 mb-8">{project.description}</p>
            
            {/* Add more project details here */}
            {/* Example:
            - Features & Amenities
            - Floor Plans
            - Location Map
            - Image Gallery
            - Pricing
            - Contact Form
            */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
