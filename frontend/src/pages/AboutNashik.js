import React from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ScrollDirectionContext } from '../context/ScrollDirectionContext';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaIndustry, FaGraduationCap, FaPlane, FaTrain, FaBus, FaCar, FaShoppingCart } from 'react-icons/fa';

const AboutNashik = () => {
  const navigate = useNavigate();
  const scrollDirection = useContext(ScrollDirectionContext);

  const handleViewProjects = () => {
    navigate('/milestones');
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  const nashikImages = [
          {
        id: 1,
        src: '/image data/trimbak.jpg',
        alt: 'Trimbakeshwar Temple',
        title: 'Trimbakeshwar Temple',
        description: 'One of the 12 Jyotirlingas'
      },
    {
      id: 2,
      src: '/image data/vineyard.jpg',
      alt: 'Nashik Vineyards',
      title: 'Wine Capital of India',
      description: 'Famous vineyards and wine production'
    },
    {
      id: 3,
      src: '/image data/godavari.png',
      alt: 'Godavari River',
      title: 'Godavari River',
      description: 'Sacred river flowing through Nashik'
    },
    {
      id: 4,
      src: '/image data/forts.jpg',
      alt: 'Nashik Forts and Mountains',
      title: 'Historic Forts & Mountains',
      description: 'Ancient forts and scenic mountain ranges'
    }
  ];

  const highlights = [
    {
      icon: <FaIndustry className="text-3xl text-gold" />,
      title: "Industrial Hub",
      description: "Major automotive, pharmaceutical, and manufacturing industries"
    },
    {
      icon: <FaGraduationCap className="text-3xl text-gold" />,
      title: "Educational Center",
      description: "Premier institutions and research centers"
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-gold" />,
      title: "Strategic Location",
      description: "Well-connected to Mumbai, Pune, and major cities"
    },
    {
      icon: <FaShoppingCart className="text-3xl text-gold" />,
      title: "Growing Economy",
      description: "Rapid development and investment opportunities"
    }
  ];

  const connectivity = [
    { icon: <FaPlane />, title: "Airport", details: "Nashik Airport with regular flights" },
    { icon: <FaTrain />, title: "Railway", details: "Major junction with high-speed connectivity" },
    { icon: <FaBus />, title: "Road Transport", details: "Excellent road network and bus services" },
    { icon: <FaCar />, title: "Highways", details: "Connected via NH-3, NH-50, and major highways" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
      <Helmet>
        <title>About Nashik - The Wine Capital of India | Ganesh Yeole Builders</title>
        <meta name="description" content="Discover Nashik - the wine capital of India, home to sacred temples, modern infrastructure, and excellent investment opportunities." />
      </Helmet>

      {/* Hero Section - Kumbh Mela */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <img 
          src="/image data/nashik_godavari_kumbh.jpg"
          alt="Nashik Kumbh Mela on Godavari Ghats"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = '/hero-building.jpg'; }}
        />
        
        {/* Minimal Overlay - Light gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent"></div>
        
        {/* Content Overlay - Positioned at center top */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-2 sm:top-3 md:top-4 inset-x-0 flex flex-col text-center items-center"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black mb-1 text-white drop-shadow-lg">
            Nashik
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-2 font-bold text-yellow-300 drop-shadow-md">
            Sacred Land of Kumbh Mela 2026-27
          </p>
          <p className="text-xs sm:text-sm md:text-base leading-relaxed px-4 max-w-2xl font-semibold text-white drop-shadow-md">
            Experience the spiritual essence and rapid development
          </p>
        </motion.div>
      </section>

      {/* Image Gallery - Nashik's Beauty */}
      <section className="py-12 px-4 bg-amber-50 dark:bg-amber-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
            whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center mb-8 text-amber-700 dark:text-amber-600"
          >
            Discover Nashik's Beauty
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nashikImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={scrollDirection === 'down' ? undefined : { opacity: 1, scale: 1 }}
                whileInView={scrollDirection === 'down' ? { opacity: 1, scale: 1 } : false}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-sm font-bold">{image.title}</h3>
                    <p className="text-xs opacity-90">{image.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 px-4 bg-white dark:bg-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
            whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 text-amber-700 dark:text-amber-600">Welcome to Nashik</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Nashik, the "Wine Capital of India," is a vibrant city in Maharashtra that seamlessly blends 
              ancient spirituality with modern development. Located on the banks of the sacred Godavari River, 
              Nashik is home to the famous Trimbakeshwar Temple, one of the 12 Jyotirlingas.
            </p>
          </motion.div>

          {/* City Highlights */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
            whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-3 flex justify-center">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-amber-700 dark:text-amber-600">{highlight.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Connectivity Section */}
      <section className="py-12 px-4 bg-amber-50 dark:bg-amber-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
            whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 text-amber-700 dark:text-amber-600">Excellent Connectivity</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Nashik is well-connected to major cities through multiple transportation modes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {connectivity.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
            whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-2xl text-gold mb-3 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-amber-700 dark:text-amber-600">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Estate Market */}
      <section className="py-12 px-4 bg-white dark:bg-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
            whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-amber-700 dark:text-amber-600">Real Estate Market</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-4 text-amber-700 dark:text-amber-600">Why Invest in Nashik?</h3>
                <ul className="space-y-2 text-base text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="text-gold mr-2">✓</span>
                    Rapid urbanization and infrastructure development
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">✓</span>
                    Affordable property prices compared to Mumbai and Pune
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">✓</span>
                    Growing IT and industrial sectors
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">✓</span>
                    Excellent connectivity and transportation
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">✓</span>
                    High quality of life and modern amenities
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img 
                  src="/image data/city_img.jpg"
                  alt="Nashik City - Real Estate Investment"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-gradient-to-r from-amber-700 to-amber-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={scrollDirection === 'down' ? undefined : { opacity: 1, y: 0 }}
            whileInView={scrollDirection === 'down' ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Invest in Nashik?</h2>
            <p className="text-lg mb-6 opacity-90">
              Discover premium properties in Nashik with Ganesh Yeole Builders and Developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleViewProjects}
                className="bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                View Our Projects
              </button>
              <button 
                onClick={handleContactUs}
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition-colors duration-200"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutNashik;
