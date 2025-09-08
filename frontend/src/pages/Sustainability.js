import React from 'react';
import { Helmet } from 'react-helmet';
import { FaLeaf, FaRecycle, FaSolarPanel, FaTree, FaWater, FaLightbulb, FaHandshake, FaHeart } from 'react-icons/fa';

const sustainabilityInitiatives = [
  {
    id: 1,
    title: "Solar Power Integration",
    description: "Installing solar panels across all our projects to reduce carbon footprint and energy costs",
    icon: FaSolarPanel,
    impact: "40% Energy Reduction",
    status: "Implemented",
    image: "/hero-building.jpg"
  },
  {
    id: 2,
    title: "Rainwater Harvesting",
    description: "Comprehensive rainwater harvesting systems to conserve water and reduce dependency on municipal supply",
    icon: FaWater,
    impact: "60% Water Conservation",
    status: "Implemented",
    image: "/hero-building.jpg"
  },
  {
    id: 3,
    title: "Waste Management",
    description: "Advanced waste segregation and recycling systems to minimize environmental impact",
    icon: FaRecycle,
    impact: "80% Waste Recycled",
    status: "Implemented",
    image: "/hero-building.jpg"
  },
  {
    id: 4,
    title: "Green Building Materials",
    description: "Using eco-friendly construction materials and sustainable building practices",
    icon: FaLeaf,
    impact: "30% Carbon Reduction",
    status: "Implemented",
    image: "/hero-building.jpg"
  }
];

const csrInitiatives = [
  {
    id: 1,
    title: "Tree Plantation Drive",
    description: "Annual tree plantation drives with community participation across all project sites",
    icon: FaTree,
    participants: "500+",
    treesPlanted: "2000+",
    image: "/hero-building.jpg"
  },
  {
    id: 2,
    title: "Education Support",
    description: "Supporting local schools and providing educational resources to underprivileged children",
    icon: FaHeart,
    beneficiaries: "200+",
    schoolsSupported: "5",
    image: "/hero-building.jpg"
  },
  {
    id: 3,
    title: "Community Development",
    description: "Infrastructure development and skill training programs for local communities",
    icon: FaHandshake,
    beneficiaries: "1000+",
    programs: "10+",
    image: "/hero-building.jpg"
  },
  {
    id: 4,
    title: "Healthcare Initiatives",
    description: "Health camps and medical support for construction workers and local communities",
    icon: FaHeart,
    beneficiaries: "300+",
    camps: "15+",
    image: "/hero-building.jpg"
  }
];

const impactMetrics = [
  {
    metric: "Carbon Footprint Reduced",
    value: "45%",
    description: "Through green building practices and renewable energy"
  },
  {
    metric: "Water Conserved",
    value: "2.5M Liters",
    description: "Annual water conservation through harvesting"
  },
  {
    metric: "Trees Planted",
    value: "2000+",
    description: "Across all our project sites"
  },
  {
    metric: "Community Beneficiaries",
    value: "1500+",
    description: "Through various CSR initiatives"
  }
];

const Sustainability = () => (
  <section className="min-h-screen pt-24 pb-12 bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
    <Helmet>
      <title>Sustainability & CSR - Ganesh Yeole Builders | Green Building & Social Responsibility</title>
      <meta name="description" content="Discover our commitment to sustainability, green building practices, and corporate social responsibility initiatives that make a positive impact on the environment and community." />
    </Helmet>

    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#E53935] mb-6">
          Building a Sustainable Future
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Committed to environmental responsibility and social impact through green building practices and community development
        </p>
      </div>

      {/* Sustainability Initiatives */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-[#E53935] mb-12">
          Our Green Building Initiatives
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {sustainabilityInitiatives.map((initiative) => (
            <div key={initiative.id} className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <initiative.icon className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-[#E53935]">
                      {initiative.title}
                    </h3>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {initiative.status}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {initiative.description}
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <span className="text-green-600 font-bold text-lg">
                      {initiative.impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSR Initiatives */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-[#E53935] mb-12">
          Corporate Social Responsibility
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {csrInitiatives.map((initiative) => (
            <div key={initiative.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={initiative.image} 
                  alt={initiative.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <initiative.icon className="text-white text-xl" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#E53935] mb-3">
                  {initiative.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {initiative.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gold">
                      {initiative.beneficiaries}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Beneficiaries
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gold">
                      {initiative.treesPlanted || initiative.schoolsSupported || initiative.programs || initiative.camps}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {initiative.treesPlanted ? 'Trees Planted' : 
                       initiative.schoolsSupported ? 'Schools' :
                       initiative.programs ? 'Programs' : 'Camps'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-[#E53935] mb-12">
          Our Environmental Impact
        </h2>
        <div className="bg-gradient-to-r from-green-50 to-gray-50 dark:from-green-900/20 dark:to-gray-900/20 rounded-3xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                  {metric.metric}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Green Building Features */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-[#E53935] mb-12">
          Green Building Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLightbulb className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-[#E53935] mb-3">Energy Efficient</h3>
            <p className="text-gray-700 dark:text-gray-300">
              LED lighting, energy-efficient appliances, and smart home automation systems
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWater className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-[#E53935] mb-3">Water Conservation</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Low-flow fixtures, rainwater harvesting, and water recycling systems
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLeaf className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-[#E53935] mb-3">Eco-Friendly Materials</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Sustainable building materials, recycled content, and non-toxic finishes
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-green-600 to-gray-600 text-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Join Our Green Revolution</h3>
          <p className="text-lg mb-6 opacity-90">
            Be part of our sustainable development journey and contribute to a greener future
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Learn More About Our Green Projects
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default Sustainability; 