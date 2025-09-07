import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaTrophy, FaBuilding, FaAward, FaStar, FaHandshake, FaArrowRight } from 'react-icons/fa';
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
        icon: FaStar,
        category: "Milestone",
        stats: "500+ Families"
      }
    ]
  },
  {
    year: 2024,
    achievements: [
      {
        title: "Sai Shraddha Apartment Completion",
        description: "Successfully completed and delivered Sai Shraddha Apartment",
        image: "/hero-building.jpg",
        icon: FaBuilding,
        category: "Project Completion",
        stats: "Delivered"
      },
      {
        title: "Vinayak Apartment Completion",
        description: "Successfully completed and delivered Vinayak Apartment",
        image: "/hero-building.jpg",
        icon: FaBuilding,
        category: "Project Completion",
        stats: "Delivered"
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
        title: "Shree Ganesh Avenue Completion",
        description: "Completed and handed over Shree Ganesh Avenue",
        image: "/hero-building.jpg",
        icon: FaBuilding,
        category: "Project Completion",
        stats: "Delivered"
      },
      {
        title: "RERA Registration",
        description: "Completed RERA registration for all ongoing and upcoming projects",
        image: "/hero-building.jpg",
        icon: FaAward,
        category: "Compliance",
        stats: "RERA Certified"
      },
      {
        title: "Technology Integration",
        description: "Implemented smart home technology and digital amenities across projects",
        image: "/hero-building.jpg",
        icon: FaHandshake,
        category: "Innovation",
        stats: "Smart Homes"
      }
    ]
  },
  {
    year: 2022,
    achievements: [
      {
        title: "Shree Ganesh Apartment Completion",
        description: "Successfully completed and delivered Shree Ganesh Apartment",
        image: "/hero-building.jpg",
        icon: FaBuilding,
        category: "Project Completion",
        stats: "Delivered"
      },
      {
        title: "Customer Excellence Award",
        description: "Received 'Excellence in Customer Service' award from Real Estate Association",
        image: "/hero-building.jpg",
        icon: FaStar,
        category: "Award",
        stats: "Service Excellence"
      },
      {
        title: "Sustainable Development",
        description: "Implemented sustainable building practices and eco-friendly materials",
        image: "/hero-building.jpg",
        icon: FaHandshake,
        category: "Sustainability",
        stats: "Eco-Friendly"
      }
    ]
  },
  {
    year: 2021,
    achievements: [
      {
        title: "Modakeshwar Apartment Completion",
        description: "Completed Modakeshwar Apartment with essential amenities",
        image: "/hero-building.jpg",
        icon: FaBuilding,
        category: "Project Completion",
        stats: "Delivered"
      },
      {
        title: "Quality Assurance",
        description: "Established comprehensive quality assurance processes and standards",
        image: "/hero-building.jpg",
        icon: FaAward,
        category: "Quality",
        stats: "Quality First"
      },
      {
        title: "Community Development",
        description: "Initiated community development programs and resident welfare activities",
        image: "/hero-building.jpg",
        icon: FaHandshake,
        category: "Community",
        stats: "Community Focus"
      }
    ]
  },
  {
    year: 2020,
    achievements: [
      {
        title: "Company Foundation",
        description: "Established Ganesh Yeole Builders and Developers with a vision for excellence",
        image: "/hero-building.jpg",
        icon: FaBuilding,
        category: "Foundation",
        stats: "Company Founded"
      },
      {
        title: "First Project Launch",
        description: "Launched our first residential project with modern amenities and Vastu compliance",
        image: "/hero-building.jpg",
        icon: FaTrophy,
        category: "Milestone",
        stats: "First Project"
      },
      {
        title: "Team Building",
        description: "Assembled a team of experienced professionals and industry experts",
        image: "/hero-building.jpg",
        icon: FaHandshake,
        category: "Team",
        stats: "Expert Team"
      }
    ]
  }
];

const JourneySection = () => {
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
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
          >
            {/* Category Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
              achievement.category === 'Project Completion' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              achievement.category === 'Certification' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
              achievement.category === 'Customer Award' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
            }`}>
              <achievement.icon className="w-4 h-4" />
              {achievement.category}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {achievement.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {achievement.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
                <span className="font-semibold text-gold">{achievement.stats}</span>
              </div>
            </div>

            {/* Learn More Button */}
            <button className="inline-flex items-center gap-2 text-gold hover:text-orange-500 font-semibold transition-colors duration-200 group">
              Learn More
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative w-80 h-64 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={achievement.image}
              alt={achievement.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Floating Icon */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg">
              <achievement.icon className="w-6 h-6 text-gold" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>Our Journey of Excellence | Ganesh Yeole Builders</title>
        <meta name="description" content="Discover our journey of excellence in real estate development. From project completions to industry awards, explore our milestones and achievements." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
                  <div className="absolute inset-0 bg-gradient-to-r from-gold to-orange-500 rounded-full blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-gold to-orange-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-xl">
                    {yearData.year}
                  </div>
                </div>
              </motion.div>

              {/* Achievements Grid */}
              <div className="space-y-20">
                {yearData.achievements.map((achievement, index) => (
                  <AchievementCard
                    key={achievement.title}
                    achievement={achievement}
                    index={index}
                    isEven={index % 2 === 0}
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

export default JourneySection;
