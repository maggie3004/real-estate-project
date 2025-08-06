import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Admin Dashboard | Ganesh Yeole Builders and Developers</title>
        <meta name="description" content="Admin dashboard for managing properties, users, and content for Ganesh Yeole Builders and Developers." />
        <meta property="og:title" content="Admin Dashboard | Ganesh Yeole Builders and Developers" />
        <meta property="og:description" content="Admin dashboard for managing properties, users, and content." />
        <meta name="twitter:title" content="Admin Dashboard | Ganesh Yeole Builders and Developers" />
        <meta name="twitter:description" content="Admin dashboard for managing properties, users, and content." />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Admin Dashboard
          </h1>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'overview'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('properties')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'properties'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'users'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'settings'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Content based on active tab */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Properties</p>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                    <FaUsers className="text-4xl opacity-80" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Active Users</p>
                      <p className="text-3xl font-bold">156</p>
                    </div>
                    <FaChartLine className="text-4xl opacity-80" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Revenue</p>
                      <p className="text-3xl font-bold">₹2.4M</p>
                    </div>
                    <FaCog className="text-4xl opacity-80" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'properties' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Property Management</h2>
                <p className="text-gray-600 dark:text-gray-300">Manage your property listings here.</p>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
                <p className="text-gray-600 dark:text-gray-300">Manage user accounts and permissions.</p>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
                <p className="text-gray-600 dark:text-gray-300">Configure your application settings.</p>
              </motion.div>
            )}
          </div>

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-200">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 