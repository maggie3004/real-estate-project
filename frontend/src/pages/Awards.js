import React from 'react';
import { Helmet } from 'react-helmet';
import { FaTrophy, FaAward, FaMedal, FaCertificate, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const awards = [
  {
    id: 1,
    title: "Best Real Estate Developer 2025",
    organization: "Maharashtra Real Estate Awards",
    year: "2025",
    image: "/hero-building.jpg",
    description: "Recognized for excellence in residential development and customer satisfaction",
    category: "Developer Award",
    icon: FaTrophy
  },
  {
    id: 2,
    title: "ISO 9001:2015 Certification",
    organization: "International Organization for Standardization",
    year: "2024",
    image: "/hero-building.jpg",
    description: "Quality management system certification for our construction processes",
    category: "Quality Certification",
    icon: FaCertificate
  },
  {
    id: 3,
    title: "Customer Satisfaction Excellence",
    organization: "Real Estate Association of India",
    year: "2024",
    image: "/hero-building.jpg",
    description: "Awarded for achieving 98% customer satisfaction across all projects",
    category: "Customer Service",
    icon: FaAward
  },
  {
    id: 4,
    title: "Best Emerging Developer",
    organization: "Nashik Business Awards",
    year: "2023",
    image: "/hero-building.jpg",
    description: "Recognized as the fastest-growing real estate developer in Nashik region",
    category: "Emerging Company",
    icon: FaMedal
  },
  {
    id: 5,
    title: "Green Building Excellence",
    organization: "Indian Green Building Council",
    year: "2023",
    image: "/hero-building.jpg",
    description: "Award for implementing sustainable building practices and eco-friendly initiatives",
    category: "Sustainability",
    icon: FaCertificate
  },
  {
    id: 6,
    title: "Best Affordable Housing Project",
    organization: "Maharashtra Housing Awards",
    year: "2023",
    image: "/hero-building.jpg",
    description: "Recognition for Shree Ganesh Heights as the best affordable housing project",
    category: "Project Award",
    icon: FaTrophy
  }
];

const events = [
  {
    id: 1,
    title: "Shree Ganesh Park Phase II Launch Event",
    date: "March 15, 2025",
    location: "Nashik Convention Center",
    image: "/hero-building.jpg",
    description: "Grand launch of our flagship project with special offers and celebrity presence",
    attendees: "500+",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "Customer Appreciation Day",
    date: "February 28, 2025",
    location: "Shree Ganesh Heights Clubhouse",
    image: "/hero-building.jpg",
    description: "Annual celebration with our valued customers featuring cultural programs and dinner",
    attendees: "300+",
    status: "Completed"
  },
  {
    id: 3,
    title: "Real Estate Expo 2025",
    date: "January 20-22, 2025",
    location: "Mumbai Exhibition Center",
    image: "/hero-building.jpg",
    description: "Showcasing our latest projects and innovations in real estate development",
    attendees: "1000+",
    status: "Completed"
  },
  {
    id: 4,
    title: "Tree Plantation Drive",
    date: "December 5, 2024",
    location: "All Project Sites",
    image: "/hero-building.jpg",
    description: "Environmental initiative with customers and community participation",
    attendees: "200+",
    status: "Completed"
  }
];

const Awards = () => {
  return (
  <section className="min-h-screen pt-24 pb-12 bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
      <Helmet>
        <title>Awards & Events - Ganesh Yeole Builders | Recognition & Celebrations</title>
        <meta name="description" content="Explore our awards, recognitions, and events. From industry awards to customer appreciation events, discover our journey of excellence." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#E53935] mb-6">
            Awards & Recognition
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Celebrating excellence, innovation, and the trust of our customers through industry recognition and memorable events
          </p>
        </div>

        {/* Awards Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-[#E53935] mb-12">
            Our Achievements & Awards
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award) => (
              <div key={award.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative">
                                      <img 
                      src={award.image} 
                      alt={award.title}
                      className="w-full h-48 object-cover"
                    />
                  <div className="absolute top-4 right-4">
                    <div className="bg-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {award.year}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <award.icon className="text-gold text-3xl" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                      {award.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#E53935] mb-2">
                    {award.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                    {award.organization}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-[#E53935] mb-12">
            Upcoming & Past Events
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full md:w-48 h-32 object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        event.status === 'Upcoming' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {event.status}
                      </span>
                      <span className="text-gold font-semibold">
                        {event.attendees} Attendees
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#E53935] mb-3">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaCalendarAlt className="text-gold" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaMapMarkerAlt className="text-gold" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#E53935] to-red-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Join Our Next Event</h3>
            <p className="text-lg mb-6 opacity-90">
              Be part of our celebrations and stay updated with our latest achievements
            </p>
            <button className="bg-white text-[#E53935] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Register for Events
            </button>
          </div>
        </div>
    </div>
  </section>
);
};

export default Awards; 