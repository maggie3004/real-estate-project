import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, FaUsers, FaHome, FaEye, FaHeart, FaPhone, 
  FaEnvelope, FaCalendar, FaDollarSign, 
  FaMapMarkerAlt, FaFilter, FaSearch,
  FaEdit, FaTrash, FaPlus, FaDownload, FaPrint, FaBell,
  FaUserPlus, FaHomeAlt, FaChartBar, FaCog
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import properties from '../data/properties';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProperty, setShowAddProperty] = useState(false);

  // Mock data for analytics
  const analyticsData = {
    totalProperties: 156,
    activeListings: 142,
    totalViews: 2847,
    totalEnquiries: 89,
    conversionRate: 3.1,
    avgPrice: 8500000,
    monthlyGrowth: 12.5,
    topPerformingArea: 'Bandra West'
  };

  const recentEnquiries = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 98765 43210', property: 'Luxury Villa in Bandra', status: 'new', date: '2024-01-15' },
    { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '+91 87654 32109', property: '2BHK Apartment', status: 'contacted', date: '2024-01-14' },
    { id: 3, name: 'Amit Kumar', email: 'amit@email.com', phone: '+91 76543 21098', property: 'Commercial Space', status: 'viewing', date: '2024-01-13' },
    { id: 4, name: 'Neha Singh', email: 'neha@email.com', phone: '+91 65432 10987', property: '3BHK Villa', status: 'closed', date: '2024-01-12' }
  ];

  const propertyStats = [
    { type: 'Apartments', count: 89, percentage: 57 },
    { type: 'Villas', count: 34, percentage: 22 },
    { type: 'Plots', count: 18, percentage: 12 },
    { type: 'Commercial', count: 15, percentage: 9 }
  ];

  const performanceMetrics = [
    { metric: 'Page Views', value: '12,847', change: '+15%', trend: 'up' },
    { metric: 'Property Views', value: '8,234', change: '+8%', trend: 'up' },
    { metric: 'Enquiries', value: '234', change: '+12%', trend: 'up' },
    { metric: 'Conversions', value: '45', change: '+5%', trend: 'up' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'viewing': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartLine },
    { id: 'properties', label: 'Properties', icon: FaHome },
    { id: 'enquiries', label: 'Enquiries', icon: FaEnvelope },
    { id: 'users', label: 'Users', icon: FaUsers },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Shree Ganesh Real Estate</title>
        <meta name="description" content="Comprehensive admin dashboard for analytics, property management, user management, and more." />
        <link rel="canonical" href={window.location.origin + '/admin'} />
        {/* Open Graph */}
        <meta property="og:title" content="Admin Dashboard | Shree Ganesh Real Estate" />
        <meta property="og:description" content="Comprehensive admin dashboard for analytics, property management, user management, and more." />
        <meta property="og:image" content={window.location.origin + '/og-image.jpg'} />
        <meta property="og:url" content={window.location.origin + '/admin'} />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Admin Dashboard | Shree Ganesh Real Estate" />
        <meta name="twitter:description" content="Comprehensive admin dashboard for analytics, property management, user management, and more." />
        <meta name="twitter:image" content={window.location.origin + '/twitter-image.jpg'} />
        {/* JSON-LD WebPage Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Admin Dashboard",
            "description": "Comprehensive admin dashboard for analytics, property management, user management, and more.",
            "url": "${window.location.origin}/admin"
          }
        `}</script>
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
        {/* Header */}
        <div className="bg-white dark:bg-[#232323] shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#181818] dark:text-white">Admin Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage your real estate business</p>
              </div>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <FaBell className="w-5 h-5 text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddProperty(true)}
                  className="flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors"
                >
                  <FaPlus className="w-4 h-4 mr-2" />
                  Add Property
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-amber-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {tab.label}
                      </motion.button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Period Selector */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-[#181818] dark:text-white">Dashboard Overview</h2>
                      <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="90days">Last 90 Days</option>
                        <option value="1year">Last Year</option>
                      </select>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Properties</p>
                            <p className="text-2xl font-bold text-[#181818] dark:text-white">{analyticsData.totalProperties}</p>
                          </div>
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FaHome className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                          <FaChartLine className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-green-600">+{analyticsData.monthlyGrowth}%</span>
                          <span className="text-gray-500 ml-1">from last month</span>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Views</p>
                            <p className="text-2xl font-bold text-[#181818] dark:text-white">{analyticsData.totalViews.toLocaleString()}</p>
                          </div>
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <FaEye className="w-6 h-6 text-green-600" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                          <FaChartLine className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-green-600">+8.2%</span>
                          <span className="text-gray-500 ml-1">from last month</span>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Enquiries</p>
                            <p className="text-2xl font-bold text-[#181818] dark:text-white">{analyticsData.totalEnquiries}</p>
                          </div>
                          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                            <FaEnvelope className="w-6 h-6 text-amber-600" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                          <FaChartLine className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-green-600">+12.5%</span>
                          <span className="text-gray-500 ml-1">from last month</span>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                            <p className="text-2xl font-bold text-[#181818] dark:text-white">{formatCurrency(analyticsData.avgPrice)}</p>
                          </div>
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <FaDollarSign className="w-6 h-6 text-purple-600" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                          <FaChartLine className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-green-600">+5.3%</span>
                          <span className="text-gray-500 ml-1">from last month</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Property Distribution */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-[#181818] dark:text-white mb-4">Property Distribution</h3>
                        <div className="space-y-4">
                          {propertyStats.map((stat, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-3" style={{
                                  backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'][index]
                                }}></div>
                                <span className="text-sm font-medium text-gray-700">{stat.type}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="h-2 rounded-full"
                                    style={{
                                      width: `${stat.percentage}%`,
                                      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'][index]
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{stat.count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Enquiries */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-[#181818] dark:text-white mb-4">Recent Enquiries</h3>
                        <div className="space-y-3">
                          {recentEnquiries.slice(0, 4).map((enquiry) => (
                            <div key={enquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{enquiry.name}</p>
                                <p className="text-xs text-gray-600">{enquiry.property}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                                  {enquiry.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold text-[#181818] dark:text-white mb-4">Performance Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {performanceMetrics.map((metric, index) => (
                          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">{metric.metric}</p>
                            <p className="text-xl font-bold text-[#181818] dark:text-white mt-1">{metric.value}</p>
                            <div className="flex items-center justify-center mt-2">
                              {metric.trend === 'up' ? (
                                <FaChartLine className="w-4 h-4 text-green-500 mr-1" />
                              ) : (
                                <FaChartBar className="w-4 h-4 text-red-500 mr-1" />
                              )}
                              <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {metric.change}
                              </span>
                            </div>
                          </div>
        ))}
      </div>
    </div>
                  </motion.div>
                )}

                {/* Properties Tab */}
                {activeTab === 'properties' && (
                  <motion.div
                    key="properties"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-[#181818] dark:text-white">Property Management</h2>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search properties..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <FaFilter className="w-4 h-4 text-gray-600" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full bg-white dark:bg-[#232323] text-[#181818] dark:text-white">
                          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-300">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Views</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-[#232323] text-[#181818] dark:text-white divide-y divide-gray-200">
                            {properties.slice(0, 10).map((property) => (
                              <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <img
                                      src={property.images[0]}
                                      alt={property.title}
                                      className="w-10 h-10 rounded-lg object-cover mr-3"
                                    />
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                      <div className="text-sm text-gray-500">{property.location}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {formatCurrency(property.price)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                    Active
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {Math.floor(Math.random() * 1000) + 100}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="text-amber-600 hover:text-amber-900"
                                    >
                                      <FaEdit className="w-4 h-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      <FaTrash className="w-4 h-4" />
                                    </motion.button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Enquiries Tab */}
                {activeTab === 'enquiries' && (
                  <motion.div
                    key="enquiries"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold text-[#181818] dark:text-white">Enquiry Management</h2>
                    
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full bg-white dark:bg-[#232323] text-[#181818] dark:text-white">
                          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-300">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-[#232323] text-[#181818] dark:text-white divide-y divide-gray-200">
                            {recentEnquiries.map((enquiry) => (
                              <tr key={enquiry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                                    <div className="text-sm text-gray-500">{enquiry.email}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.property}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(enquiry.status)}`}>
                                    {enquiry.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex items-center space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="text-blue-600 hover:text-blue-900"
                                    >
                                      <FaPhone className="w-4 h-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="text-green-600 hover:text-green-900"
                                    >
                                      <FaEnvelope className="w-4 h-4" />
                                    </motion.button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Other tabs can be implemented similarly */}
                {activeTab === 'users' && (
                  <motion.div
                    key="users"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-12"
                  >
                    <FaUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#181818] dark:text-white mb-2">User Management</h3>
                    <p className="text-gray-600 dark:text-gray-300">Manage user accounts and permissions</p>
                  </motion.div>
                )}

                {activeTab === 'analytics' && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-12"
                  >
                    <FaChartBar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#181818] dark:text-white mb-2">Advanced Analytics</h3>
                    <p className="text-gray-600 dark:text-gray-300">Detailed analytics and reporting features</p>
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-12"
                  >
                    <FaCog className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#181818] dark:text-white mb-2">Settings</h3>
                    <p className="text-gray-600 dark:text-gray-300">Configure your dashboard and preferences</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard; 