import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaTrophy, FaBuilding, FaUsers, FaAward, FaStar, FaHandshake, FaArrowRight } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';

const milestones = [
  {
    year: 2025,
    achievements: [
      {
        title: "Shree Ganesh Park Phase II Launch",
        description: "Successfully launched our flagship project with 200+ units sold in pre-launch phase",
        image: "/hero-building.jpg",
        icon: FaBuilding,
        category: "Project Launch",
        stats: "200+ Units Sold"
      },
      {
        title: "Best Developer Award 2025",
        description: "Recognized as 'Best Real Estate Developer' by Maharashtra Real Estate Awards",
        image: "/hero-building.jpg",
        icon: FaTrophy,
        category: "Award",
        stats: "Industry Recognition"
      },
      {
        title: "500+ Happy Families Milestone",
        description: "Reached the milestone of serving 500+ families across all our projects",
        image: "/hero-building.jpg",
        icon: FaUsers,
        category: "Customer Milestone",
        stats: "500+ Families"
      }
    ]
  },
  {
    year: 2024,
    achievements: [
      {
        title: "Shree Ganesh Heights Completion",
        description: "Successfully completed and delivered Shree Ganesh Heights project ahead of schedule",
        image: "/hero-building.jpg",
        icon: FaBuilding,
        category: "Project Completion",
        stats: "150 Units Delivered"
      },
      {
        title: "ISO 9001:2015 Certification",
        description: "Achieved ISO 9001:2015 quality management certification for our processes",
        image: "/hero-building.jpg",
        icon: FaAward,
        category: "Certification",
        stats: "Quality Standard"
      },
      {
        title: "Customer Satisfaction Award",
        description: "Received 'Highest Customer Satisfaction' award from Real Estate Association",
        image: "/hero-building.jpg",
        icon: FaStar,
        category: "Customer Award",
        stats: "98% Satisfaction"
      },
      {
        title: "Green Building Initiative",
        description: "Launched eco-friendly building practices across all new projects",
        image: "/hero-building.jpg",
        icon: FaHandshake,
        category: "Sustainability",
        stats: "Green Certified"
      }
    ]
  },
  {
    year: 2023,
    achievements: [
      {
        title: "Sai Shraddha Apartment Success",
        description: "Completed Sai Shraddha Apartment with 100% occupancy within 6 months",
        image: "/hero-building.jpg",
        icon: FaBuilding,
        category: "Project Success",
        stats: "100% Occupancy"
      },
      {
        title: "25+ Projects Milestone",
        description: "Reached the milestone of completing 25+ successful projects across Nashik",
        image: "/hero-building.jpg",
        icon: FaTrophy,
        category: "Company Milestone",
        stats: "25+ Projects"
      },
      {
        title: "Best Emerging Developer",
        description: "Awarded 'Best Emerging Real Estate Developer' by Nashik Business Awards",
        image: "/hero-building.jpg",
        icon: FaAward,
        category: "Industry Award",
        stats: "Emerging Leader"
      },
      {
        title: "Digital Transformation",
        description: "Launched comprehensive digital platform for property management and customer service",
        image: "/hero-building.jpg",
        icon: FaStar,
        category: "Technology",
        stats: "Digital First"
      }
    ]
  }
];

const Milestones = () => {
  const [activeYear, setActiveYear] = useState(2025);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    });
  }, [controls]);

  const AchievementCard = ({ achievement, index, isEven }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative group ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      {/* Connecting Lines */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-gold via-blue-500 to-green-500 z-0"></div>
      
      {/* Achievement Card */}
      <div className={`flex flex-col lg:flex-row items-center gap-8 relative z-10 ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      }`}>
        
        {/* Content Section */}
        <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-600 relative overflow-hidden group"
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Header with Icon and Category */}
            <div className={`flex items-center gap-4 mb-6 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-gold to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <achievement.icon className="text-white text-2xl" />
              </motion.div>
              <div className="flex flex-col">
                <span className="inline-block bg-gradient-to-r from-gold to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                  {achievement.category}
                </span>
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold text-[#E53935] mb-4 leading-tight">
              {achievement.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {achievement.description}
            </p>
            
            {/* Stats Badge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`inline-block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg ${isEven ? 'lg:ml-auto' : ''}`}
            >
              {achievement.stats}
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline Node */}
        <div className="relative z-20">
          <motion.div 
            whileHover={{ scale: 1.2 }}
            className="w-8 h-8 bg-gradient-to-br from-gold to-orange-500 rounded-full border-4 border-white dark:border-gray-800 shadow-xl relative"
          >
            {/* Pulsing Animation */}
            <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-20"></div>
          </motion.div>
          
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-gold to-blue-500 hidden lg:block"></div>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative group overflow-hidden rounded-3xl shadow-2xl"
          >
            <img 
              src={achievement.image} 
              alt={achievement.title}
              className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Hover Overlay Content */}
            <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="p-6 text-white">
                <div className="flex items-center gap-2">
                  <FaArrowRight className="text-gold" />
                  <span className="font-semibold">Learn More</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-[#181818] dark:text-white transition-colors duration-300">
      <Helmet>
        <title>Milestones & Achievements - Ganesh Yeole Builders | Our Journey of Excellence</title>
        <meta name="description" content="Explore our journey of excellence through key milestones and achievements from 2023-2025. Discover how we've grown and succeeded in real estate development." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gradient-to-br from-gold/10 via-blue-500/10 to-green-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <h1 className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#E53935] via-gold to-orange-500 bg-clip-text text-transparent mb-8">
              Our Journey of Excellence
            </h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-[#E53935] via-gold to-orange-500 mx-auto mb-8 rounded-full"
            ></motion.div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Celebrating milestones, achievements, and the trust of <span className="font-bold text-[#E53935]">500+ families</span> across <span className="font-bold text-gold">16+ years</span> of dedicated service
            </p>
          </div>
        </motion.div>

        {/* Year Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <div className="flex space-x-4 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg">
            {milestones.map((yearData) => (
              <button
                key={yearData.year}
                onClick={() => setActiveYear(yearData.year)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeYear === yearData.year
                    ? 'bg-gradient-to-r from-gold to-orange-500 text-white shadow-lg scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {yearData.year}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Timeline */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          {/* Main Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-gold via-blue-500 to-green-500 h-full hidden lg:block rounded-full shadow-lg"></div>

          {milestones.map((yearData, yearIndex) => (
            <div key={yearData.year} className={`mb-20 ${activeYear === yearData.year ? 'block' : 'hidden'}`}>
              {/* Enhanced Year Header */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold to-orange-500 rounded-full blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-gold to-orange-500 text-white px-12 py-6 rounded-full text-3xl font-bold shadow-2xl">
                    {yearData.year}
                  </div>
                </div>
              </motion.div>

              {/* Achievements Grid */}
              <div className="space-y-16">
                {yearData.achievements.map((achievement, achievementIndex) => (
                  <AchievementCard 
                    key={achievement.title}
                    achievement={achievement}
                    index={achievementIndex}
                    isEven={achievementIndex % 2 === 0}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Milestones;