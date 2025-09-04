import React from 'react';
import { Helmet } from 'react-helmet';
import { FaAward, FaUsers, FaBuilding, FaHeart, FaLeaf, FaHandshake } from 'react-icons/fa';

const AboutPage = () => (
  <section className="min-h-screen pt-24 pb-12 bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
    <Helmet>
      <title>About Us - Ganesh Yeole Builders and Developers | Vision, Mission & Leadership</title>
      <meta name="description" content="Learn about Ganesh Yeole Builders and Developers - our vision, mission, leadership team, and commitment to building quality homes in Nashik, Mumbai, and Pune." />
    </Helmet>
    
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#E53935] mb-6">
          About Ganesh Yeole Builders
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Building Dreams, Creating Landmarks - 16+ Years of Excellence in Real Estate Development
        </p>
      </div>


      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Company Story */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#E53935] mb-6 flex items-center gap-3">
              <FaBuilding className="text-gold" />
              Our Story
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-[#E53935]">Sai Prasad Builders & Developers</strong> was established in 2008-09 in Nashik by Mr. Ganesh Yeole, a visionary leader known for his strong moral values and dynamic approach. With a humble beginning, he built the company from the ground up, fostering trust, transparency, and long-lasting relationships with clients, partners, and stakeholders.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Over the past 16 years, we have successfully completed <strong>25+ projects</strong> across multiple prime locations in Nashik. From luxury developments to budget-friendly homes, we have consistently set new benchmarks in design, quality, and sustainability. Our projects are a reflection of our commitment to delivering well-planned, Vastu-compliant homes with top-notch construction quality and modern amenities.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                With the second generation now actively contributing to the business, we are entering a new phase of growth and transformation. Under the guidance of Mr. Prasad G. Yeole, a qualified Civil Engineer with a deep understanding of modern construction practices, the company is embracing advanced technologies, innovative design concepts, and sustainable building solutions.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <FaHeart className="text-blue-600 text-2xl" />
                <h3 className="text-2xl font-bold text-blue-600">Our Mission</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To build more than just houses—we create homes that offer comfort, convenience, and a superior lifestyle. By maintaining a balance between affordability and premium quality, we ensure that every homeowner receives a complete, well-equipped living space that meets their aspirations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <FaAward className="text-green-600 text-2xl" />
                <h3 className="text-2xl font-bold text-green-600">Our Vision</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To create homes that go beyond four walls, delivering true satisfaction to every homeowner. We strive to build high-quality, well-designed, and affordable spaces that offer comfort, security, and a fulfilling lifestyle while prioritizing innovation and sustainability.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#E53935] mb-6 flex items-center gap-3">
              <FaHandshake className="text-gold" />
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUsers className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Customer First</h4>
                  <p className="text-gray-600 dark:text-gray-300">Every decision we make is centered around our customers' needs and satisfaction.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <FaLeaf className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Sustainability</h4>
                  <p className="text-gray-600 dark:text-gray-300">We believe in building a better future through eco-friendly practices and green initiatives.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <FaAward className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Quality Excellence</h4>
                  <p className="text-gray-600 dark:text-gray-300">We never compromise on quality, ensuring every project meets the highest standards.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <FaHandshake className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Trust & Transparency</h4>
                  <p className="text-gray-600 dark:text-gray-300">We maintain complete transparency in all our dealings and build lasting trust.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chairperson Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-gradient-to-br from-gold-50 to-gold-100 dark:from-gold-900/20 dark:to-gold-800/20 rounded-2xl p-8 text-center border-2 border-gold/20">
              <div className="mb-6">
                <img 
                  src="/owner-placeholder.png" 
                  alt="Mr. Prasad Yeole - Chairperson" 
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gold shadow-lg" 
                />
              </div>
              <h3 className="text-2xl font-bold text-[#E53935] mb-2">Mr. Prasad G. Yeole</h3>
              <p className="text-gold font-semibold mb-4">Chairperson & Managing Director</p>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <p>• Civil Engineer (B.E.)</p>
                <p>• Vastu Expert (Pursuing)</p>
                <p>• 16+ Years Experience</p>
                <p>• Second Generation Leader</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-left">
                <h4 className="text-lg font-bold text-[#E53935] mb-3">Message from the Chairperson</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                  "We are committed to building homes that blend innovation, quality, and tradition—creating spaces where families thrive and memories are made. Our journey is driven by the trust of our customers and our unwavering commitment to excellence. Thank you for trusting us with your dreams."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutPage; 
