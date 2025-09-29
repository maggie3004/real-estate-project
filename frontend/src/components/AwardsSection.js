import React from 'react';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const awards = [
  { icon: <FaTrophy className="w-8 h-8 text-yellow-500" />, name: 'Ultratech Best Building', year: '2023-24' },
  { icon: <FaMedal className="w-8 h-8 text-yellow-500" />, name: 'BAI Best Building', year: '2018' },
  { icon: <FaAward className="w-8 h-8 text-yellow-500" />, name: 'Lokmat Best Brand', year: '2022' },
  { icon: <FaTrophy className="w-8 h-8 text-yellow-500" />, name: 'Dainik Bhaskar Best Building', year: '2021' },
  { icon: <FaAward className="w-8 h-8 text-yellow-500" />, name: 'IPPL Winner', year: '2022' },
];

const AwardsSection = () => (
  <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Awards & Recognition
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Celebrating excellence and recognition in the real estate industry
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-6 max-w-6xl mx-auto">
        {awards.map((award, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 md:p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center min-h-[160px] md:min-h-[180px]"
          >
            <div className="mb-3 md:mb-4 flex justify-center">
              {award.icon}
            </div>
            <div className="font-bold text-xs sm:text-sm md:text-base text-gray-900 dark:text-white mb-2 leading-tight">
              {award.name}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {award.year}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AwardsSection; 