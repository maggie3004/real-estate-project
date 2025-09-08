import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaTrophy, FaBuilding } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';

const milestones = [
  {
    year: 2025,
    achievements: [
      {
        title: "Shree Ganesh Park Phase II",
        description: "Premium residential development with modern amenities",
        image: "/assets/shree-ganesh-heights/gallery/IMG-20250722-WA0066.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "200+ Units"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Luxury apartments with world-class facilities",
        image: "/assets/shree-ganesh-heights/gallery/IMG-20250722-WA0067.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "Premium Living"
      },
      {
        title: "Shree Ganesh Srushti",
        description: "Eco-friendly residential complex",
        image: "/assets/shree-ganesh-srushti/gallery/IMG-20250722-WA0068.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "Green Living"
      }
    ]
  },
  {
    year: 2024,
    achievements: [
      {
        title: "Sai Shraddha Apartment",
        description: "Completed residential project on College Road",
        image: "/assets/sai-shraddha-apartment/gallery/IMG-20250722-WA0066.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "80 Units"
      },
      {
        title: "Vinayak Apartment",
        description: "Delivered comfortable homes in Panchavati",
        image: "/assets/sai-shraddha-apartment/gallery/IMG-20250722-WA0067.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "60 Units"
      },
      {
        title: "Shree Ganesh Avenue",
        description: "Premium residential development",
        image: "/assets/sai-shraddha-apartment/gallery/IMG-20250722-WA0068.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Quality Homes"
      },
      {
        title: "Shree Ganesh Apartment",
        description: "Modern living spaces with amenities",
        image: "/assets/sai-shraddha-apartment/gallery/IMG-20250722-WA0069.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Delivered"
      },
      {
        title: "Modakeshwar Apartment",
        description: "Comfortable homes with essential facilities",
        image: "/assets/sai-shraddha-apartment/gallery/IMG-20250722-WA0070.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Delivered"
      }
    ]
  },
  {
    year: 2023,
    achievements: [
      {
        title: "Shree Ganesh Park Phase I",
        description: "First phase of our flagship project",
        image: "/assets/shree-ganesh-heights/gallery/IMG-20250722-WA0069.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Phase I"
      },
      {
        title: "Shree Gajanan Niwas",
        description: "Residential complex with modern amenities",
        image: "/assets/shree-ganesh-heights/gallery/IMG-20250722-WA0070.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Delivered"
      },
      {
        title: "Shree Ganesh Apartment",
        description: "Quality construction with Vastu compliance",
        image: "/assets/shree-ganesh-srushti/gallery/IMG-20250722-WA0069.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Vastu Homes"
      }
    ]
  },
  {
    year: 2022,
    achievements: [
      {
        title: "Shree Ganesh Heights",
        description: "Premium residential towers",
        image: "/assets/shree-ganesh-srushti/gallery/IMG-20250722-WA0070.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Towers"
      },
      {
        title: "Shree Ganesh Srushti",
        description: "Eco-friendly residential development",
        image: "/assets/shree-ganesh-heights/gallery/IMG-20250722-WA0066.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Eco-Friendly"
      },
      {
        title: "Shree Ganesh Park",
        description: "Garden view residential complex",
        image: "/assets/shree-ganesh-heights/gallery/IMG-20250722-WA0067.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Garden View"
      }
    ]
  },
  {
    year: 2021,
    achievements: [
      {
        title: "Shree Ganesh Avenue",
        description: "Main road residential project",
        image: "/assets/shree-ganesh-heights/gallery/IMG-20250722-WA0068.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Main Road"
      },
      {
        title: "Shree Ganesh Apartment",
        description: "Quality homes with modern amenities",
        image: "/assets/shree-ganesh-srushti/gallery/IMG-20250722-WA0066.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Modern Homes"
      },
      {
        title: "Modakeshwar Apartment",
        description: "Comfortable living spaces",
        image: "/assets/shree-ganesh-srushti/gallery/IMG-20250722-WA0067.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Comfort"
      }
    ]
  },
  {
    year: 2020,
    achievements: [
      {
        title: "Shree Ganesh Heights",
        description: "Premium residential development",
        image: "/assets/shree-ganesh-srushti/gallery/IMG-20250722-WA0068.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Premium"
      },
      {
        title: "Shree Ganesh Srushti",
        description: "Eco-friendly residential complex",
        image: "/assets/shree-ganesh-srushti/gallery/IMG-20250722-WA0069.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Eco-Friendly"
      },
      {
        title: "Shree Ganesh Park",
        description: "Garden view apartments",
        image: "/assets/shree-ganesh-srushti/gallery/IMG-20250722-WA0070.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Garden View"
      }
    ]
  }
];

const JourneySection = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    });
  }, [controls]);


  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>Our Journey of Excellence | Ganesh Yeole Builders</title>
        <meta name="description" content="Discover our journey of excellence in real estate development. From project completions to industry awards, explore our milestones and achievements." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold font-semibold text-sm mb-4">
            <FaTrophy className="w-4 h-4" />
            Our Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Journey of <span className="text-gold">Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our remarkable journey of growth, innovation, and excellence in the real estate industry. 
            Each milestone represents our commitment to delivering exceptional value to our customers.
          </p>
        </motion.div>


        {/* Our Milestones - Simple Grid Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Milestones
            </h2>
          </div>

          {/* Project Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {milestones.map((yearData, yearIndex) => 
              yearData.achievements.map((achievement, achievementIndex) => (
                <motion.div
                  key={`${yearData.year}-${achievementIndex}`}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: (yearIndex * 0.1) + (achievementIndex * 0.05)
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="relative group cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-out">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={(e) => { e.target.src = '/hero-building.jpg'; }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                          {achievement.title}
                        </h3>
                        <p className="text-white/80 text-xs line-clamp-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-2 h-2 bg-gold rounded-full"></div>
                          <span className="text-gold text-xs font-medium">{achievement.stats}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
