import React from 'react';
import { Helmet } from 'react-helmet';
import { FaTrophy, FaBuilding, FaUsers, FaAward, FaStar, FaHandshake } from 'react-icons/fa';

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

const Milestones = () => (
  <section className="min-h-screen pt-24 pb-12 bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
    <Helmet>
      <title>Milestones & Achievements - Ganesh Yeole Builders | Our Journey of Excellence</title>
      <meta name="description" content="Explore our journey of excellence through key milestones and achievements from 2023-2025. Discover how we've grown and succeeded in real estate development." />
    </Helmet>

    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#E53935] mb-6">
          Our Journey of Excellence
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Celebrating milestones, achievements, and the trust of 500+ families across 16+ years of dedicated service
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-gold via-blue-500 to-green-500 h-full hidden lg:block"></div>

        {milestones.map((yearData, yearIndex) => (
          <div key={yearData.year} className="mb-16">
            {/* Year Header */}
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-gold to-orange-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg">
                {yearData.year}
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-12">
              {yearData.achievements.map((achievement, achievementIndex) => (
                <div key={achievement.title} className={`flex flex-col lg:flex-row items-center gap-8 ${
                  achievementIndex % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}>
                  
                  {/* Content */}
                  <div className={`flex-1 ${achievementIndex % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                          <achievement.icon className="text-white text-xl" />
                        </div>
                        <div>
                          <span className="inline-block bg-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {achievement.category}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-[#E53935] mb-3">
                        {achievement.title}
                      </h3>
                      
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                        {achievement.description}
                      </p>
                      
                      <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold">
                        {achievement.stats}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gold rounded-full border-4 border-white dark:border-gray-800 shadow-lg hidden lg:block"></div>
                  </div>

                  {/* Image */}
                  <div className="flex-1">
                    <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                      <img 
                        src={achievement.image} 
                        alt={achievement.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-20 bg-gradient-to-r from-gold-50 to-orange-50 dark:from-gold-900/20 dark:to-orange-900/20 rounded-3xl p-12">
        <h2 className="text-3xl font-bold text-center text-[#E53935] mb-8">
          Our Growth Story in Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gold mb-2">25+</div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">Happy Families</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">16+</div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">Years of Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">Customer Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-[#E53935] to-red-600 text-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Be Part of Our Success Story?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join hundreds of satisfied families who have found their dream homes with us
          </p>
          <button className="bg-white text-[#E53935] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Explore Our Projects
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default Milestones; 