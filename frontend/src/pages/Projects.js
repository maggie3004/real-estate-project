import React from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectCarousel from '../components/ProjectCarousel';
import { Helmet } from 'react-helmet';

// Import sample project data - this should be replaced with real data from your backend
const projects = {
  upcoming: [
    {
      id: 'up1',
      name: 'Shree Ganesh Heights Phase II',
      description: 'Luxurious 2 & 3 BHK apartments with modern amenities and scenic views.',
      status: 'Upcoming',
      location: 'Nashik Road',
      image: '/sai-shraddha-apartment/IMG-20250722-WA0066.jpg',
    },
    // Add more upcoming projects...
  ],
  ongoing: [
    {
      id: 'on1',
      name: 'Shree Ganesh Park Phase I',
      description: 'Premium 1, 2 & 3 BHK apartments with world-class amenities.',
      status: 'Ongoing',
      location: 'Nashik',
      image: '/sai-shraddha-apartment/IMG-20250722-WA0067.jpg',
    },
    // Add more ongoing projects...
  ],
  completed: [
    {
      id: 'cp1',
      name: 'Sai Shraddha Apartment',
      description: 'Completed residential complex with 1 & 2 BHK apartments.',
      status: 'Completed',
      location: 'Nashik',
      image: '/sai-shraddha-apartment/IMG-20250722-WA0068.jpg',
    },
    // Add more completed projects...
  ],
};

// Add component property to each project
const mapProjectsWithComponent = (projectsList) =>
  projectsList.map(project => ({
    ...project,
    component: ProjectCard
  }));

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Our Projects | Ganesh Yeole Builders and Developers</title>
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
