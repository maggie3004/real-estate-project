import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaTrophy, FaBuilding } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';

const milestones = [
  {
    year: 2025,
    achievements: [
      {
        title: "Shreeganesh Srushti",
        description: "Latest residential development with contemporary design",
        image: "/assets/shree-ganesh-srushti/gallery/front.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "100 Units"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Premium residential development with modern amenities",
        image: "/assets/shree-ganesh-heights/gallery/front.jpeg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "120 Units"
      },
      {
        title: "Shree Ganesh Park",
        description: "Premium residential development with multiple wings",
        image: "/assets/shree-ganesh-park/gallery/a-view.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "150 Units"
      }
    ]
  },
  {
    year: 2024,
    achievements: [
      {
        title: "Sai Shraddha Apartment",
        description: "Beautifully designed residential complex on College Road",
        image: "/assets/sai-shraddha-apartment/gallery/front.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "80 Units"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Luxury apartments with world-class facilities",
        image: "/assets/shree-ganesh-heights/gallery/day-front.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Premium Living"
      },
      {
        title: "Shree Ganesh Park",
        description: "Premium residential development with modern amenities",
        image: "/assets/shree-ganesh-park/gallery/b-view.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Quality Homes"
      },
      {
        title: "Shreeganesh Srushti",
        description: "Eco-friendly residential complex",
        image: "/assets/shree-ganesh-srushti/gallery/night.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Green Living"
      },
      {
        title: "Sai Shraddha Apartment",
        description: "Modern living spaces with amenities",
        image: "/assets/sai-shraddha-apartment/gallery/top-view.jpg",
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
        image: "/assets/shree-ganesh-park/gallery/night-view-a.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Phase I"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Residential complex with modern amenities",
        image: "/assets/shree-ganesh-heights/gallery/night-front.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Delivered"
      },
      {
        title: "Shreeganesh Srushti",
        description: "Quality construction with modern design",
        image: "/assets/shree-ganesh-srushti/gallery/1bhk.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Modern Design"
      }
    ]
  },
  {
    year: 2022,
    achievements: [
      {
        title: "Shree Ganesh Heights",
        description: "Premium residential towers",
        image: "/assets/shree-ganesh-heights/gallery/top-view.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Towers"
      },
      {
        title: "Shree Ganesh Park",
        description: "Garden view residential complex",
        image: "/assets/shree-ganesh-park/gallery/ter-view.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Garden View"
      },
      {
        title: "Sai Shraddha Apartment",
        description: "Quality homes with modern amenities",
        image: "/assets/sai-shraddha-apartment/gallery/parking.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Quality Homes"
      }
    ]
  },
  {
    year: 2021,
    achievements: [
      {
        title: "Shree Ganesh Park",
        description: "Main road residential project",
        image: "/assets/shree-ganesh-park/gallery/Wing A 1BHK.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Main Road"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Quality homes with modern amenities",
        image: "/assets/shree-ganesh-heights/gallery/floor-plan.jpeg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Modern Homes"
      },
      {
        title: "Shreeganesh Srushti",
        description: "Comfortable living spaces",
        image: "/assets/shree-ganesh-srushti/gallery/1bhk (2).jpg",
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
        title: "Shree Ganesh Park",
        description: "Premium residential development",
        image: "/assets/shree-ganesh-park/gallery/Wing A 2BHK.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Premium"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Eco-friendly residential complex",
        image: "/assets/shree-ganesh-heights/gallery/day-front.jpg",
        icon: FaBuilding,
        category: "Completed Project",
        stats: "Eco-Friendly"
      },
      {
        title: "Shreeganesh Srushti",
        description: "Garden view apartments",
        image: "/assets/shree-ganesh-srushti/gallery/2bhk.jpg",
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
