import React, { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaDownload, FaSwimmingPool, FaCar, FaDumbbell, FaTree, FaWifi, FaShieldAlt } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

const amenities = [
  { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
  { name: 'Parking', icon: <FaCar /> },
  { name: 'Gym', icon: <FaDumbbell /> },
  { name: 'Garden', icon: <FaTree /> },
  { name: 'Wi-Fi', icon: <FaWifi /> },
  { name: 'Security', icon: <FaShieldAlt /> },
];

const gallery = [
  '/images/project1.jpg',
  '/images/project2.jpg',
  '/images/project3.jpg',
  '/images/project4.jpg',
];

const PropertyDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const projectName = 'Project Name'; // Replace with dynamic name if available

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 py-12 px-4 mt-20">
      {/* Left/Main Content */}
      <div className="flex-1 min-w-0">
        {/* Main Photo, Name, Tagline */}
        <div className="rounded-xl overflow-hidden shadow-lg mb-6">
          <img src="/images/project-main.jpg" alt="Project Main" className="w-full h-64 object-cover" />
        </div>
        <h1 className="text-3xl font-bold mb-2">{projectName}</h1>
        <div className="text-lg text-gold font-semibold mb-4">Project Tagline Goes Here</div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-gold">210+</div>
            <div className="text-sm text-gray-700">Units</div>
              </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-gold">1250-1400 Sq.Ft</div>
            <div className="text-sm text-gray-700">Heaven</div>
              </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-gold">7</div>
            <div className="text-sm text-gray-700">Floors</div>
            </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-gold">11+</div>
            <div className="text-sm text-gray-700">Amenities</div>
          </div>
        </div>
        {/* Gallery */}
        <div className="mb-8">
          <div className="text-xl font-semibold mb-2">Gallery</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((img, idx) => (
              <img key={idx} src={img} alt={`Gallery ${idx+1}`} className="rounded-lg h-32 w-full object-cover" />
              ))}
            </div>
                </div>
        {/* Amenities */}
        <div>
          <div className="text-xl font-semibold mb-2">Amenities</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map((a, idx) => (
              <div key={a.name} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 shadow">
                <span className="text-gold text-2xl">{a.icon}</span>
                <span className="font-medium text-gray-800">{a.name}</span>
              </div>
            ))}
                                </div>
                                </div>
      </div>
      {/* Right/Action Panel */}
      <div className="w-full md:w-80 flex-shrink-0">
        <div className="sticky top-28 flex flex-col gap-6 bg-[#232323] rounded-xl shadow-lg p-6">
          <button className="w-full bg-gold text-white font-bold py-3 rounded-lg shadow hover:bg-rose hover:text-gold transition" onClick={() => setShowModal(true)}>Enquire Now</button>
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