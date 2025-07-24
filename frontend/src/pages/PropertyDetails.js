import React, { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaDownload, FaEnvelope } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import properties from '../data/properties';
import AmenitiesSection from '../components/AmenitiesSection';
import LocationSection from '../components/LocationSection';
import { useParams, Link } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find(p => String(p.id) === String(id)) || properties[0];
  const projectName = property?.title || 'Project Name';
  const tagline = property?.type ? `${property.type} | ${property.facing} Facing` : 'Project Tagline Goes Here';
  const stats = [
    { label: 'Units', value: '210+' },
    { label: 'Area', value: property?.area || 'N/A' },
    { label: 'Floors', value: property?.totalFloors || 'N/A' },
    { label: 'Amenities', value: property?.amenities?.length ? `${property.amenities.length}+` : 'N/A' },
  ];

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 py-12 px-4 mt-20">
      {/* Back to Listings Button */}
      <div className="absolute left-4 top-4">
        <Link to="/listings" className="inline-block px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gold hover:text-white transition">
          ← Back to Listings
        </Link>
      </div>
      {/* Left/Main Content */}
      <div className="flex-1 min-w-0">
        {/* Main Photo, Name, Tagline */}
        <div className="rounded-xl overflow-hidden shadow-lg mb-6">
          <img src={property.image} alt="Project Main" className="w-full h-64 object-cover" />
        </div>
        <h1 className="text-3xl font-bold mb-2">{projectName}</h1>
        <div className="text-lg text-gold font-semibold mb-4">{tagline}</div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-100 rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-gold">{stat.value}</div>
              <div className="text-sm text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
        {/* Gallery */}
        <div className="mb-8">
          <div className="text-xl font-semibold mb-2">Gallery</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {property.images && property.images.map((img, idx) => (
              <img key={idx} src={img} alt={`Gallery ${idx + 1}`} className="rounded-lg h-32 w-full object-cover" />
            ))}
          </div>
        </div>
        {/* Amenities */}
        <div className="mb-8">
          <AmenitiesSection />
        </div>
        {/* Isometric Views */}
        <div className="mb-8">
          <div className="text-xl font-semibold mb-2">Isometric 2BHK/1BHK Views</div>
          <div className="flex gap-6 flex-wrap">
            {(property?.isometricViews && property.isometricViews.length > 0
              ? property.isometricViews
              : [
                  { label: '2BHK - Spacious layout with balcony', src: '/images/project1.jpg' },
                  { label: '1BHK - Compact and efficient design', src: '/images/project2.jpg' }
                ]
            ).map((view, idx) => (
              <div key={view.label + idx} className="flex flex-col items-center">
                <img src={view.src} alt={view.label} className="w-48 h-32 object-cover rounded-lg mb-2" />
                <span className="font-medium">{view.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Embedded Project Video Placeholder */}
        <div className="mb-8">
          <div className="text-xl font-semibold mb-2">Project Video</div>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Project Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64"
            ></iframe>
          </div>
        </div>
        {/* Map & Landmarks */}
        <div className="mb-8">
          <LocationSection />
          {/* Landmark icons and distances (dynamic) */}
          <div className="mt-6">
            <div className="text-xl font-semibold mb-2">Nearby Landmarks</div>
            <div className="flex flex-wrap gap-6">
              {(property?.landmarks && property.landmarks.length > 0
                ? property.landmarks
                : [
                    { icon: '🏫', label: 'School', distance: '5 mins' },
                    { icon: '🏥', label: 'Hospital', distance: '8 mins' },
                    { icon: '🛒', label: 'Mall', distance: '10 mins' },
                    { icon: '🚇', label: 'Metro Station', distance: '3 mins' },
                  ]
              ).map((lm, idx) => (
                <div key={lm.label + idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 shadow">
                  <span role="img" aria-label={lm.label} className="text-2xl">{lm.icon}</span>
                  <span className="font-medium">{lm.label} - {lm.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Right/Action Panel */}
      <div className="w-full md:w-80 flex-shrink-0 flex flex-col items-center gap-6">
        {/* Round Enquire Now Button */}
        <button
          className="w-16 h-16 bg-gold text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose hover:text-gold transition mb-2"
          onClick={() => setShowModal(true)}
          aria-label="Enquire Now"
        >
          <FaEnvelope className="text-2xl" />
        </button>
        <a href="/brochure.pdf" download className="w-full flex items-center justify-center gap-2 bg-white text-gold font-bold py-3 rounded-lg shadow hover:bg-gold hover:text-white transition">
          <FaDownload /> Download Brochure
        </a>
        <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 rounded-lg shadow hover:bg-green-600 transition">
          <FaWhatsapp /> WhatsApp
        </a>
        <a href="tel:+919999999999" className="w-full flex items-center justify-center gap-2 bg-gold text-white font-bold py-3 rounded-lg shadow hover:bg-rose hover:text-gold transition">
          <FaPhoneAlt /> Call Now
        </a>
      </div>
      {/* Enquire Now Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative animate-fadeIn">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gold text-2xl" onClick={() => setShowModal(false)}>&times;</button>
            <ContactForm propertyTitle={projectName} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails; 