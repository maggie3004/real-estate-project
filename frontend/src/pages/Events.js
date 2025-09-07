import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const events = [
    {
      id: 1,
      title: "Shree Ganesh Park Phase II Launch Event",
      date: "March 15, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Nashik Convention Center",
      address: "College Road, Nashik, Maharashtra 422005",
      image: "/hero-building.jpg",
      description: "Grand launch of our flagship project with special offers, celebrity presence, and exclusive preview of our latest development. Join us for an evening of luxury and innovation.",
      attendees: "500+",
      status: "Upcoming",
      category: "Project Launch",
      highlights: [
        "Exclusive project preview",
        "Special launch offers",
        "Celebrity guest appearance",
        "Luxury dinner",
        "Live entertainment"
      ],
      registrationRequired: true
    },
    {
      id: 2,
      title: "Customer Appreciation Day 2025",
      date: "February 28, 2025",
      time: "4:00 PM - 8:00 PM",
      location: "Shree Ganesh Heights Clubhouse",
      address: "Pathardi, Nashik, Maharashtra",
      image: "/hero-building.jpg",
      description: "Annual celebration with our valued customers featuring cultural programs, dinner, and recognition of our loyal customers. A special evening to thank our extended family.",
      attendees: "300+",
      status: "Completed",
      category: "Customer Event",
      highlights: [
        "Cultural performances",
        "Customer recognition",
        "Gourmet dinner",
        "Family activities",
        "Lucky draws"
      ],
      registrationRequired: false
    },
    {
      id: 3,
      title: "Real Estate Expo 2025",
      date: "January 20-22, 2025",
      time: "10:00 AM - 7:00 PM",
      location: "Mumbai Exhibition Center",
      address: "Bandra Kurla Complex, Mumbai 400051",
      image: "/hero-building.jpg",
      description: "Showcasing our latest projects and innovations in real estate development. Meet our experts, explore our portfolio, and discover investment opportunities.",
      attendees: "1000+",
      status: "Completed",
      category: "Exhibition",
      highlights: [
        "Project showcase",
        "Expert consultations",
        "Investment seminars",
        "Networking opportunities",
        "Special expo offers"
      ],
      registrationRequired: true
    },
    {
      id: 4,
      title: "Tree Plantation Drive",
      date: "December 5, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "All Project Sites",
      address: "Various locations across Nashik",
      image: "/hero-building.jpg",
      description: "Environmental initiative with customers and community participation. Let's make our city greener together by planting trees and promoting sustainability.",
      attendees: "200+",
      status: "Completed",
      category: "CSR Event",
      highlights: [
        "Tree plantation",
        "Environmental awareness",
        "Community participation",
        "Refreshments",
        "Certificates"
      ],
      registrationRequired: true
    },
    {
      id: 5,
      title: "Property Investment Seminar",
      date: "April 10, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Pune Business Center",
      address: "Hinjewadi, Pune, Maharashtra 411057",
      image: "/hero-building.jpg",
      description: "Learn about real estate investment strategies, market trends, and opportunities in the current market. Expert insights and networking opportunities.",
      attendees: "150+",
      status: "Upcoming",
      category: "Seminar",
      highlights: [
        "Expert presentations",
        "Market analysis",
        "Investment strategies",
        "Q&A session",
        "Networking tea"
      ],
      registrationRequired: true
    },
    {
      id: 6,
      title: "Festival Celebration",
      date: "October 15, 2024",
      time: "6:00 PM - 10:00 PM",
      location: "Sai Shraddha Apartment",
      address: "DGP Nagar, Kamatwade, Nashik",
      image: "/hero-building.jpg",
      description: "Celebrating festivals with our residents and community. Cultural programs, traditional food, and community bonding activities.",
      attendees: "400+",
      status: "Completed",
      category: "Community Event",
      highlights: [
        "Cultural programs",
        "Traditional food",
        "Community games",
        "Prize distribution",
        "Fireworks"
      ],
      registrationRequired: false
    }
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowRegistration(true);
  };

  const handleRegister = (eventId) => {
    alert(`Registration successful for ${selectedEvent.title}! We will send you confirmation details soon.`);
    setShowRegistration(false);
    setSelectedEvent(null);
  };

  const upcomingEvents = events.filter(event => event.status === 'Upcoming');
  const pastEvents = events.filter(event => event.status === 'Completed');

  return (
    <section className="min-h-screen pt-24 pb-12 bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
      <Helmet>
        <title>Events - Ganesh Yeole Builders | Upcoming & Past Events</title>
        <meta name="description" content="Join our upcoming events and explore past celebrations. From project launches to customer appreciation events, discover our community activities." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#E53935] mb-6">
            Our Events & Celebrations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join us for exciting events, project launches, and community celebrations. Connect with our team and fellow customers.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[#E53935] mb-12">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#E53935] mb-3">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FaCalendarAlt className="text-gold" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FaClock className="text-gold" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FaMapMarkerAlt className="text-gold" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FaUsers className="text-gold" />
                      <span>{event.attendees} Attendees</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <button
                    onClick={() => handleEventClick(event)}
                    className="w-full bg-gradient-to-r from-[#E53935] to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
                  >
                    {event.registrationRequired ? 'Register Now' : 'Learn More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[#E53935] mb-12">
            Past Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#E53935] mb-3">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FaCalendarAlt className="text-gold" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FaClock className="text-gold" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FaMapMarkerAlt className="text-gold" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FaUsers className="text-gold" />
                      <span>{event.attendees} Attendees</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="text-center">
                    <span className="text-green-600 font-semibold">✓ Event Completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Statistics section removed as requested */}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#E53935] to-red-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Our Events</h3>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to our newsletter to get notified about upcoming events and special offers
            </p>
            <button className="bg-white text-[#E53935] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Event Registration Modal */}
      {showRegistration && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#E53935]">Event Registration</h3>
              <button
                onClick={() => setShowRegistration(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                {selectedEvent.title}
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gold" />
                  <span>{selectedEvent.date} at {selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gold" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-gold" />
                  <span>{selectedEvent.attendees} Attendees</span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Event Highlights:</h5>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {selectedEvent.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-gold">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => handleRegister(selectedEvent.id)}
                  className="flex-1 bg-gradient-to-r from-[#E53935] to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
                >
                  Confirm Registration
                </button>
                <button
                  onClick={() => setShowRegistration(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events; 