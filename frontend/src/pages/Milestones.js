import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const projects = [
    {
        year: '2022',
        name: 'Modakeshwar Apartment',
        location: 'Nashik',
        status: 'Completed',
        statusColor: 'bg-emerald-500',
        image: '/assets/projects/modakeshwar-apartment.jpg',
        link: '/projects/modakeshwar-apartment'
    },
    {
        year: '2022',
        name: 'Sai Shraddha Apartment',
        location: 'Nashik',
        status: 'Ongoing',
        statusColor: 'bg-gold-300',
        image: '/assets/projects/sai-shraddha-apartment.jpg',
        link: '/projects/sai-shraddha-apartment'
    },
    {
        year: '2023',
        name: 'Shree-Gajanan-Niwas',
        location: 'Nashik',
        status: 'Completed',
        statusColor: 'bg-green-100 text-green-700',
        imageUrl: 'https://placehold.co/400x250/E5E7EB/4B5563?text=Shree-Gajanan'
    },
    {
        year: '2023',
        name: 'Shree-Ganesh-Apartment',
        location: 'Nashik',
        status: 'Ongoing',
        statusColor: 'bg-yellow-100 text-yellow-700',
        imageUrl: 'https://placehold.co/400x250/E5E7EB/4B5563?text=Shree-Ganesh-Apartment'
    },
    {
        year: '2024',
        name: 'Shree-Ganesh-Avenue',
        location: 'Nashik',
        status: 'Completed',
        statusColor: 'bg-green-100 text-green-700',
        imageUrl: 'https://placehold.co/400x250/E5E7EB/4B5563?text=Shree-Ganesh-Avenue'
    },
    {
        year: '2024',
        name: 'Shree-Ganesh-Heights',
        location: 'Nashik',
        status: 'Ongoing',
        statusColor: 'bg-yellow-100 text-yellow-700',
        imageUrl: 'https://placehold.co/400x250/E5E7EB/4B5563?text=Shree-Ganesh-Heights'
    },
    {
        year: '2025',
        name: 'Shree-Ganesh-Park-Phase-I',
        location: 'Pune',
        status: 'Ongoing',
        statusColor: 'bg-yellow-100 text-yellow-700',
        imageUrl: 'https://placehold.co/400x250/E5E7EB/4B5563?text=Shree-Ganesh-Park-Phase-I'
    },
    {
        year: '2025',
        name: 'Shree-Ganesh-Park-Phase-II',
        location: 'Pune',
        status: 'Ongoing',
        statusColor: 'bg-yellow-100 text-yellow-700',
        imageUrl: 'https://placehold.co/400x250/E5E7EB/4B5563?text=Shree-Ganesh-Park-Phase-II'
    },
    {
        year: '2025',
        name: 'Shree-Ganesh-Shrusti',
        location: 'Mumbai',
        status: 'Ongoing',
        statusColor: 'bg-yellow-100 text-yellow-700',
        imageUrl: 'https://placehold.co/400x250/E5E7EB/4B5563?text=Shree-Ganesh-Shrusti'
    },
    {
        year: '2025',
        name: 'Vinayak-Apartment',
        location: 'Mumbai',
        status: 'Ongoing',
        statusColor: 'bg-yellow-100 text-yellow-700',
        imageUrl: 'https://placehold.co/400x250/E5E7EB/4B5563?text=Vinayak-Apartment'
    }
];

const Timeline = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cute-bg to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl mx-auto mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-playfair">
                    Our Journey
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Building dreams into reality, one project at a time
                </p>
            </motion.div>

            <div className="max-w-7xl mx-auto relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-300 via-accent-300 to-gold-300" />

                {projects.map((project, index) => {
                    const isLeft = index % 2 === 0;
                    
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative mb-24 flex justify-center items-center"
                        >
                            {/* Year marker */}
                            <div className={`absolute ${isLeft ? '-left-4' : '-right-4'} top-1/2 transform -translate-y-1/2`}>
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500 font-playfair">
                                    {project.year}
                                </span>
                            </div>

                            {/* Timeline dot */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-accent-500 shadow-lg" />

                            {/* Project card */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className={`w-[calc(50%-2rem)] ${isLeft ? 'mr-auto' : 'ml-auto'} 
                                    bg-white dark:bg-gray-800 rounded-2xl shadow-cute overflow-hidden`}
                            >
                                <div className="relative group">
                                    <img 
                                        src={project.image} 
                                        alt={project.name}
                                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {project.name}
                                        </h3>
                                        <span className={`px-4 py-1 rounded-full text-sm font-medium text-white ${project.statusColor}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        {project.location}
                                    </p>
                                    <Link 
                                        to={project.link}
                                        className="inline-block w-full text-center bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium py-3 px-6 rounded-xl hover:from-primary-600 hover:to-accent-600 transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Timeline;
