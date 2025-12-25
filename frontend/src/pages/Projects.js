import React from 'react';
// Assets for ongoing projects (using src/assets paths)
import sghFront from '../assets/shree-ganesh-heights/gallery/front.jpeg';
import sghTopView from '../assets/shree-ganesh-heights/gallery/top-view.jpg';
import sghNightFront from '../assets/shree-ganesh-heights/gallery/night-front.jpg';
import sghBrochure from '../assets/shree-ganesh-heights/Shri Ganesh Heights.pdf';

import sgpAView from '../assets/shree-ganesh-park/gallery/a-view.jpg';
import sgpBView from '../assets/shree-ganesh-park/gallery/b-view.jpg';
import sgpNightA from '../assets/shree-ganesh-park/gallery/night-view-a.jpg';
import sgpBrochure from '../assets/shree-ganesh-park/Shree Ganesh Park E- Brochure.pdf';

import sgsFront from '../assets/shree-ganesh-srushti/gallery/front.jpg';
import sgs1bhk from '../assets/shree-ganesh-srushti/gallery/1bhk.jpg';
import sgs2bhk from '../assets/shree-ganesh-srushti/gallery/2bhk.jpg';
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
      name: 'Shree Ganesh Heights',
      description: 'Premium residential development with modern amenities and excellent location advantages.',
      status: 'Ongoing',
      location: 'Nashik',
      image: sghFront,
      images: [sghFront, sghTopView, sghNightFront],
      configuration: '2BHK, 3BHK',
      brochureUrl: sghBrochure,
      reraNumber: 'P51600077829',
      reraQr: '/assets/shree-ganesh-heights/gallery/Rera_QR.png'
    },
    {
      id: 'on2',
      name: 'Shree Ganesh Park',
      description: 'A premium residential development with multiple wings offering various apartment configurations.',
      status: 'Ongoing',
      location: 'Nashik',
      image: sgpAView,
      images: [sgpAView, sgpBView, sgpNightA],
      configuration: '1BHK, 2BHK',
      brochureUrl: sgpBrochure,
      reraNumber: 'P51600051448',
      reraQr: '/assets/shree-ganesh-park/gallery/Rera_QR.png'
    },
    {
      id: 'on3',
      name: 'Shree Ganesh Srushti',
      description: 'Latest residential development with contemporary design and all modern facilities.',
      status: 'Ongoing',
      location: 'Nashik',
      image: sgsFront,
      images: [sgsFront, sgs1bhk, sgs2bhk],
      configuration: '1BHK, 2BHK',
      brochureUrl: '/assets/shree-ganesh-srushti/gallery/Shree Ganesh Srushti Digital Broucher_compressed.pdf',
      reraNumber: 'PM1220002501249',
      reraQr: '/assets/shree-ganesh-srushti/gallery/Rera_QR.png'
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
