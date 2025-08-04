import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaTrophy, FaRocket } from 'react-icons/fa';

const milestones = [
  { id: 1, title: 'Ideation', description: 'Project idea finalized and team formed.', icon: <FaStar /> },
  { id: 2, title: 'Design', description: 'Wireframes and UI/UX design completed.', icon: <FaCheckCircle /> },
  { id: 3, title: 'Development', description: 'Frontend and backend integration done.', icon: <FaTrophy /> },
  { id: 4, title: 'Launch', description: 'Project successfully launched!', icon: <FaRocket /> },
];

const Timeline = () => {
  return (
    <div className="relative px-6 py-10 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Project Milestones</h2>
        <p className="text-gray-500 mt-2">Track your journey step by step</p>
      </div>

      <div className="relative border-l-4 border-blue-500 ml-6">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="mb-10 ml-6 group"
          >
            <div className="absolute -left-8 flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
              {milestone.icon}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold">{milestone.title}</h3>
              <p className="mt-2 text-gray-600">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
