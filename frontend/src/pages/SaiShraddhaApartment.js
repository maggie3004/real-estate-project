import React from 'react';
import { FaSwimmingPool, FaCar, FaDumbbell, FaTree, FaWifi, FaShieldAlt } from 'react-icons/fa';

const amenities = [
  { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
  { name: 'Parking', icon: <FaCar /> },
  { name: 'Gym', icon: <FaDumbbell /> },
  { name: 'Garden', icon: <FaTree /> },
  { name: 'Wi-Fi', icon: <FaWifi /> },
  { name: 'Security', icon: <FaShieldAlt /> },
];

const gallery = [
  '/images/ssa-1.jpg',
  '/images/ssa-2.jpg',
  '/images/ssa-3.jpg',
  '/images/ssa-4.jpg',
];

const SaiShraddhaApartment = () => {
  const projectName = 'Sai Shraddha Apartment';
  const tagline = 'Redefining Living at DGP Nagar, Kamatwade';

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 py-12 px-4 mt-20 min-h-screen bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
      {/* Main Photo, Name, Tagline */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-6">
        <img src="/images/ssa-main.jpg" alt="Project Main" className="w-full h-64 object-cover" />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-gold">{projectName}</h1>
      <div className="text-lg text-gold font-semibold mb-4">{tagline}</div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xl font-bold text-gold">King-size 2 BHK</div>
          <div className="text-sm text-gray-200">Luxury Homes</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xl font-bold text-gold">Smart</div>
          <div className="text-sm text-gray-200">Living</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xl font-bold text-gold">Record Time</div>
          <div className="text-sm text-gray-200">Completion</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xl font-bold text-gold">Sustainable</div>
          <div className="text-sm text-gray-200">Tech</div>
        </div>
      </div>
      {/* Gallery */}
      <div className="mb-8">
        <div className="text-xl font-semibold mb-2 text-gold">Gallery</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.map((img, idx) => (
            <img key={idx} src={img} alt={`Gallery ${idx+1}`} className="rounded-lg h-32 w-full object-cover" />
          ))}
        </div>
      </div>
      {/* Amenities */}
      <div>
        <div className="text-xl font-semibold mb-2 text-gold">Amenities</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.map((a, idx) => (
            <div key={a.name} className="flex items-center gap-3 bg-gray-800 rounded-lg p-3 shadow text-white">
              <span className="text-gold text-2xl">{a.icon}</span>
              <span className="font-medium">{a.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="mt-8 text-gray-200 text-lg">
        Sai Shraddha Apartment sets a new benchmark in modern living at DGP Nagar, Kamatwade, featuring king-size 2 BHK luxury homes designed for spacious comfort and convenience. Built with advanced technologies and renewable energy solutions, the project promotes sustainability and smart living. With life-easing conveniences, Sai Shraddha Apartment was completed and sold in record time, reflecting its exceptional quality and demand. A true symbol of innovation and excellence.
      </div>
    </div>
  );
};

export default SaiShraddhaApartment; 