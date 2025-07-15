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
  '/images/ma-1.jpg',
  '/images/ma-2.jpg',
  '/images/ma-3.jpg',
  '/images/ma-4.jpg',
];

const ModakeshwarApartment = () => {
  const projectName = 'Modakeshwar Apartment';
  const tagline = 'Exclusive Living at Wasan Nagar';

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 py-12 px-4 mt-20 text-white" style={{background: '#181A20', minHeight: '100vh'}}>
      {/* Main Photo, Name, Tagline */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-6">
        <img src="/images/ma-main.jpg" alt="Project Main" className="w-full h-64 object-cover" />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-gold">{projectName}</h1>
      <div className="text-lg text-gold font-semibold mb-4">{tagline}</div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xl font-bold text-gold">Limited</div>
          <div className="text-sm text-gray-200">Apartments</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xl font-bold text-gold">Premium</div>
          <div className="text-sm text-gray-200">Quality</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xl font-bold text-gold">Modern</div>
          <div className="text-sm text-gray-200">Elevation</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xl font-bold text-gold">Serene</div>
          <div className="text-sm text-gray-200">Environment</div>
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
        Located in the prime area of Wasan Nagar, Pathardi, Modakeshwar Apartment is an exclusive standalone residential project offering limited yet luxurious apartments. With its modern elevation, premium construction quality, and thoughtfully designed spaces, this project redefines elegant and comfortable living. Designed for those who seek privacy, sophistication, and convenience, Modakeshwar Apartment promises a refined lifestyle in a well-connected and serene environment.
      </div>
    </div>
  );
};

export default ModakeshwarApartment; 