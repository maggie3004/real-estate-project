import React from 'react';
import { FaHeart, FaAward } from 'react-icons/fa';

const AboutSection = () => (
  <section className="py-12 md:py-20 bg-white dark:bg-black/50 transition-colors duration-300">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-600 dark:text-amber-400 mb-6">
        About Us
      </h2>

      {/* Marathi Text */}
      <div className="text-amber-600 dark:text-amber-400 text-base md:text-lg mb-10 italic font-bold leading-relaxed">
        घर म्हणजे फक्त ४ भिंती नाही तर समृद्धी, समाधान आणि आनंदाचे मंदिर असते.<br />
        पंचतत्वांचे अभ्यास करून, भोगद्याम, सुखदर्शनम व रम्या ह्या वास्तुशास्त्रांच्या मूलभूत तत्वांवर आधारित आम्ही गृह सौख्य साकारत आहोत.<br />
        प्रत्येक सभासदाला लाभेल असे परिपूर्ण घर साकारत आहोत.
      </div>

{/* English Text Content */}
<div className="space-y-6 mb-10">
        <h4 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">
          Building Dreams, Creating Landmarks
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg text-justify leading-relaxed">
          Established in 2008-09 by visionary leader Mr. Ganesh Yeole, Sai Prasad Builders & Developers has transformed Nashik's real estate landscape with <strong className="text-amber-600 dark:text-amber-400 font-bold">25+ successful projects</strong> and <strong className="text-amber-600 dark:text-amber-400 font-bold">500+ happy families</strong>. Our journey from humble beginnings to becoming a trusted name in real estate reflects our commitment to excellence, transparency, and customer-centric approach.
        </p>
      </div>

      {/* Mission & Vision Boxes */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

  {/* Vision Box */}
  <div className="bg-gradient-to-br from-green-50 to-green-100 
    dark:from-green-900/20 dark:to-green-800/20 
    p-8 rounded-2xl text-left 
    border border-green-200 dark:border-green-700/30 
    shadow-sm hover:shadow-md transition-shadow">

    <div className="flex items-center gap-3 mb-4">
      <FaAward className="text-green-600 text-2xl" />
      <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
        Our Vision
      </h3>
    </div>

    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
      To create homes that go beyond four walls, delivering true satisfaction to every homeowner. 
      We strive to build high-quality, well-designed, and affordable spaces that offer comfort, 
      security, and a fulfilling lifestyle while prioritizing innovation and sustainability.
    </p>
  </div>

  {/* Mission Box */}
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 
    dark:from-gray-800/20 dark:to-gray-700/20 
    p-8 rounded-2xl text-left 
    border border-gray-200 dark:border-gray-700/30 
    shadow-sm hover:shadow-md transition-shadow">

    <div className="flex items-center gap-3 mb-4">
      <FaHeart className="text-gray-600 dark:text-gray-400 text-2xl" />
      <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
        Our Mission
      </h3>
    </div>

    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
      To build more than just houses—we create homes that offer comfort, convenience, and a superior lifestyle. 
      By maintaining a balance between affordability and premium quality, we ensure that every homeowner 
      receives a complete, well-equipped living space that meets their aspirations.
    </p>
  </div>

</div>


      

      {/* Quote */}
      <div className="font-bold text-amber-600 dark:text-amber-500 text-lg italic md:text-xl mt-8 border-t border-amber-100 dark:border-amber-900/30 pt-8">
        "For us, home is not just about four walls, but a world where love resides and memories are created."
      </div>
    </div>
  </section>
);

export default AboutSection;
