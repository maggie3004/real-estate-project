import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectCarousel from '../components/ProjectCarousel';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

// Temporary data for development
const tempData = {
  upcoming: [
    {
      id: 'up1',
      name: 'Shree Ganesh Heights Phase II',
      description: 'Luxurious 2 & 3 BHK apartments with modern amenities and scenic views.',
      status: 'Upcoming',
      location: 'Nashik Road',
      images: [
        '/sai-shraddha-apartment/IMG-20250722-WA0066.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0067.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0068.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0069.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0070.jpg',
      ],
      thumbnailImage: '/sai-shraddha-apartment/IMG-20250722-WA0066.jpg',
    },
  ],
  ongoing: [
    {
      id: 'on1',
      name: 'Shree Ganesh Park Phase I',
      description: 'Premium 1, 2 & 3 BHK apartments with world-class amenities.',
      status: 'Ongoing',
      location: 'Nashik',
      images: [
        '/sai-shraddha-apartment/IMG-20250722-WA0067.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0068.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0069.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0070.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0071.jpg',
      ],
      thumbnailImage: '/sai-shraddha-apartment/IMG-20250722-WA0067.jpg',
    },
  ],
  completed: [
    {
      id: 'cp1',
      name: 'Sai Shraddha Apartment',
      description: 'Completed residential complex with 1 & 2 BHK apartments.',
      status: 'Completed',
      location: 'Nashik',
      images: [
        '/sai-shraddha-apartment/IMG-20250722-WA0068.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0069.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0070.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0071.jpg',
        '/sai-shraddha-apartment/IMG-20250722-WA0072.jpg',
      ],
      thumbnailImage: '/sai-shraddha-apartment/IMG-20250722-WA0068.jpg',
    },
  ],
};

// Add component property to each project
const mapProjectsWithComponent = (projectsList) =>
  projectsList.map(project => ({
    ...project,
    component: ProjectCard
  }));

const Projects = () => {
  const [projects, setProjects] = useState(tempData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        if (!response.ok) throw new Error('Failed to fetch projects');
        
        const data = await response.json();
        
        // Categorize projects
        const categorizedProjects = data.reduce((acc, project) => {
          if (!acc[project.status.toLowerCase()]) {
            acc[project.status.toLowerCase()] = [];
          }
          acc[project.status.toLowerCase()].push(project);
          return acc;
        }, { upcoming: [], ongoing: [], completed: [] });

        setProjects(categorizedProjects);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error Loading Projects</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Our Projects | Shree Ganesh Real Estate</title>
        <meta name="description" content="Explore our upcoming, ongoing, and completed real estate projects in Nashik." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <div className="bg-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Projects</h1>
            <p className="text-xl text-gray-600">Discover our collection of premium real estate developments</p>
          </div>
        </div>

        {/* Project Sections */}
        <ProjectCarousel 
          title="Upcoming Projects" 
          projects={mapProjectsWithComponent(projects.upcoming)}
        />
        
        <div className="bg-white py-4">
          <ProjectCarousel 
            title="Ongoing Projects" 
            projects={mapProjectsWithComponent(projects.ongoing)}
          />
        </div>

        <ProjectCarousel 
          title="Completed Projects" 
          projects={mapProjectsWithComponent(projects.completed)}
        />
      </div>
    </>
  );
};

export default Projects;
