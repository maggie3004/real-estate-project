import React from 'react';
import { Helmet } from 'react-helmet';
import { FaLeaf, FaRecycle, FaSolarPanel, FaWater, FaLightbulb, FaSun } from 'react-icons/fa';

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

      {/* Impact Metrics */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-[#E53935] mb-12">
          Our Environmental Impact
        </h2>
        <div className="bg-gradient-to-r from-green-50 to-gray-50 dark:from-green-900/20 dark:to-gray-900/20 rounded-3xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLightbulb className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-[#E53935] mb-3">Energy Efficient</h3>
            <p className="text-gray-700 dark:text-gray-300">
              State-of-the-art LED lighting systems, energy-efficient HVAC units, and integrated smart home automation for optimal consumption management across all residential and common areas
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWater className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-[#E53935] mb-3">Water Conservation</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Comprehensive water management with low-flow fixtures, advanced rainwater harvesting systems, and greywater recycling to minimize municipal water dependency
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLeaf className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-[#E53935] mb-3">Eco-Friendly Materials</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Premium sustainable building materials with recycled content, non-toxic finishes, and certified green building certifications to ensure environmental responsibility and occupant health
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSun className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-[#E53935] mb-3">Solar Power for Common Areas</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Advanced photovoltaic systems powering all communal spaces, reducing grid dependency and operational costs significantly
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
);

export default Sustainability; 