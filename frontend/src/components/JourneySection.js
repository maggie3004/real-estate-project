import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaTrophy, FaBuilding, FaCalendarAlt, FaArrowRight, FaStar } from 'react-icons/fa';
import { motion, useAnimation, useInView } from 'framer-motion';

const milestones = [
  {
    year: 2025,
    achievements: [
      {
        title: "Shreeganesh Srushti",
        description: "Latest residential development with contemporary design",
        image: "/assets/shree-ganesh-srushti/gallery/front.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "100 Units"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Premium residential development with modern amenities",
        image: "/assets/shree-ganesh-heights/gallery/front.jpeg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "120 Units"
      },
      {
        title: "Shree Ganesh Park",
        description: "Premium residential development with multiple wings",
        image: "/assets/shree-ganesh-park/gallery/a-view.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
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
        category: "Ongoing Project",
        stats: "80 Units"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Luxury apartments with world-class facilities",
        image: "/assets/shree-ganesh-heights/gallery/day-front.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "Premium Living"
      },
      {
        title: "Shree Ganesh Park",
        description: "Premium residential development with modern amenities",
        image: "/assets/shree-ganesh-park/gallery/b-view.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "Quality Homes"
      },
      {
        title: "Shreeganesh Srushti",
        description: "Eco-friendly residential complex",
        image: "/assets/shree-ganesh-srushti/gallery/night.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "Green Living"
      },
      {
        title: "Sai Shraddha Apartment",
        description: "Modern living spaces with amenities",
        image: "/assets/sai-shraddha-apartment/gallery/top-view.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
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
        category: "Ongoing Project",
        stats: "Phase I"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Residential complex with modern amenities",
        image: "/assets/shree-ganesh-heights/gallery/night-front.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "Delivered"
      },
      {
        title: "Shreeganesh Srushti",
        description: "Quality construction with modern design",
        image: "/assets/shree-ganesh-srushti/gallery/1bhk.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
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
        category: "Ongoing Project",
        stats: "Towers"
      },
      {
        title: "Shree Ganesh Park",
        description: "Garden view residential complex",
        image: "/assets/shree-ganesh-park/gallery/ter-view.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "Garden View"
      },
      {
        title: "Sai Shraddha Apartment",
        description: "Quality homes with modern amenities",
        image: "/assets/sai-shraddha-apartment/gallery/parking.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
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
        category: "Ongoing Project",
        stats: "Main Road"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Quality homes with modern amenities",
        image: "/assets/shree-ganesh-heights/gallery/floor-plan.jpeg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "Modern Homes"
      },
      {
        title: "Shreeganesh Srushti",
        description: "Comfortable living spaces",
        image: "/assets/shree-ganesh-srushti/gallery/1bhk (2).jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
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
        category: "Ongoing Project",
        stats: "Premium"
      },
      {
        title: "Shree Ganesh Heights",
        description: "Eco-friendly residential complex",
        image: "/assets/shree-ganesh-heights/gallery/day-front.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "Eco-Friendly"
      },
      {
        title: "Shreeganesh Srushti",
        description: "Garden view apartments",
        image: "/assets/shree-ganesh-srushti/gallery/2bhk.jpg",
        icon: FaBuilding,
        category: "Ongoing Project",
        stats: "Garden View"
      }
    ]
  }
];

const JourneySection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const timelineItemRightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <Helmet>
        <title>Our Journey of Excellence | Ganesh Yeole Builders</title>
        <meta name="description" content="Discover our journey of excellence in real estate development. From project completions to industry awards, explore our milestones and achievements." />
      </Helmet>

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-500/10 to-gold/10 text-primary-600 dark:text-primary-400 font-semibold text-sm mb-6 border border-primary-200 dark:border-primary-800">
            <FaTrophy className="w-4 h-4" />
            Our Journey
            <FaStar className="w-3 h-3 text-gold" />
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Journey of <span className="bg-gradient-to-r from-primary-600 to-gold bg-clip-text text-transparent">Excellence</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Discover our remarkable journey of growth, innovation, and excellence in the real estate industry. 
            Each milestone represents our commitment to delivering exceptional value to our customers.
          </motion.p>
        </motion.div>


        {/* Zigzag Timeline */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Enhanced Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-gold to-primary-500 hidden lg:block">
            {/* Timeline Glow Effect */}
            <div className="absolute inset-0 w-3 -left-1 bg-gradient-to-b from-primary-500/20 via-gold/20 to-primary-500/20 blur-sm"></div>
          </div>

        {/* Timeline Items */}
        <div className="space-y-16">
          {milestones.map((yearData, yearIndex) => (
              <motion.div
                key={yearData.year}
                variants={yearIndex % 2 === 0 ? timelineItemVariants : timelineItemRightVariants}
                className="relative"
              >
                {/* Enhanced Year Badge - Central */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 w-16 h-16 bg-gradient-to-r from-primary-600 to-gold rounded-full flex items-center justify-center shadow-lg z-10 hidden lg:flex group">
                  {/* Pulsing Ring Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600 to-gold animate-ping opacity-20"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600 to-gold animate-pulse opacity-30"></div>
                  
                  <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-sm group-hover:text-gold transition-colors duration-300">{yearData.year}</span>
                  </div>
                  
                  {/* Sparkle Effect */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-400 rounded-full animate-pulse opacity-60" style={{animationDelay: '0.5s'}}></div>
                </div>

                {/* Mobile Year Badge */}
                <div className="lg:hidden mb-8 text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-gold text-white rounded-full font-bold text-lg shadow-lg">
                    <FaCalendarAlt className="w-5 h-5" />
                    {yearData.year}
                  </div>
                </div>

                {/* Content Container */}
                <div className={`lg:grid lg:grid-cols-2 lg:gap-8 items-center ${yearIndex % 2 === 0 ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'}`}>
                  
                  {/* Left Side Content */}
                  <motion.div 
                    className={`${yearIndex % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'} ${yearIndex % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group relative">
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                      
                      {/* Project Images Grid - Enhanced */}
                      <div className="grid grid-cols-3 gap-1 p-2 relative z-20">
                        {yearData.achievements.slice(0, 3).map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="relative aspect-[4/3] overflow-hidden rounded-md group/image">
                            <img
                              src={achievement.image}
                              alt={achievement.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => { e.target.src = '/hero-building.jpg'; }}
                              loading="lazy"
                            />
                            {/* Image Overlay Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                            {/* Corner Accent */}
                            <div className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        ))}
                      </div>

                      {/* Enhanced Content - Compact */}
                      <div className="p-3 relative z-20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary-600 to-gold rounded-full animate-pulse"></div>
                            <span className="text-primary-600 dark:text-primary-400 font-semibold text-xs group-hover:text-gold transition-colors duration-300">
                              {yearData.achievements.length} Projects
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                            {yearData.year}
                          </h3>
                        </div>
                        
                        {/* Enhanced Project List - Compact */}
                        <div className="space-y-1.5">
                          {yearData.achievements.slice(0, 2).map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="flex items-center gap-2 p-1.5 bg-gray-50 dark:bg-gray-700 rounded-md group/item hover:bg-gradient-to-r hover:from-primary-50 hover:to-gold/10 dark:hover:from-primary-900/20 dark:hover:to-gold/10 transition-all duration-300">
                              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:animate-pulse"></div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white text-xs group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors duration-300">
                                  {achievement.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-xs">
                                  {achievement.stats}
                                </p>
                              </div>
                              {/* Subtle Progress Indicator */}
                              <div className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Side Stats - Compact */}
                  <motion.div 
                    className={`${yearIndex % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'} ${yearIndex % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} mt-6 lg:mt-0`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gradient-to-br from-primary-600 to-gold rounded-2xl p-3 text-white relative overflow-hidden group border border-white/10 shadow-2xl">
                      {/* Unique Geometric Pattern */}
                      <div className="absolute inset-0 opacity-15">
                        <div className="absolute top-1 right-1 w-8 h-8 border-2 border-white/30 rounded-full animate-spin" style={{animationDuration: '12s'}}></div>
                        <div className="absolute bottom-1 left-1 w-6 h-6 border-2 border-white/30 rounded-full animate-spin" style={{animationDuration: '8s', animationDirection: 'reverse'}}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/20 rotate-45 animate-pulse"></div>
                      </div>
                      
                      {/* Compact Header with Unique Badge */}
                      <div className="text-center mb-2 relative z-10">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full mb-1">
                          <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium">EXCELLENCE</span>
                        </div>
                        <h3 className="text-sm font-bold group-hover:scale-105 transition-transform duration-300">{yearData.year}</h3>
                      </div>

                      {/* Compact Stats in Single Row */}
                      <div className="flex justify-between items-center mb-2 relative z-10">
                        <div className="text-center group/stat">
                          <div className="text-lg font-bold group-hover/stat:scale-110 transition-transform duration-300">{yearData.achievements.length}</div>
                          <div className="text-white/70 text-xs">Projects</div>
                        </div>
                        <div className="w-px h-8 bg-white/30"></div>
                        <div className="text-center group/stat">
                          <div className="text-lg font-bold group-hover/stat:scale-110 transition-transform duration-300">
                            {yearData.achievements.reduce((sum, achievement) => {
                              const units = achievement.stats.match(/\d+/);
                              return sum + (units ? parseInt(units[0]) : 0);
                            }, 0)}
                          </div>
                          <div className="text-white/70 text-xs">Units</div>
                        </div>
                      </div>

                      {/* Compact Achievements with Unique Layout */}
                      <div className="relative z-10">
                        <div className="space-y-1">
                          {yearData.achievements.slice(0, 2).map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full group/achievement hover:bg-white/20 transition-all duration-300">
                              <FaStar className="w-2 h-2 text-yellow-300 group-hover/achievement:animate-spin transition-transform duration-300 flex-shrink-0" />
                              <span className="text-xs font-medium group-hover/achievement:text-yellow-200 transition-colors duration-300 text-center flex-1">{achievement.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Unique Corner Decorations */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-70"></div>
                      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-70" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute top-2 left-2 w-1 h-1 bg-primary-200 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-2 right-2 w-1 h-1 bg-gold rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* Bottom CTA - Compact */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary-600 to-gold rounded-xl p-6 text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Ready to Be Part of Our Next Milestone?</h3>
            <p className="text-sm mb-4 opacity-90">Join thousands of satisfied homeowners who trusted us with their dreams.</p>
            <button className="bg-white text-primary-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm">
              Explore Our Projects
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
