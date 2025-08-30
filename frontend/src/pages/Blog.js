import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiArrowRight,
  FiArrowLeft,
  FiGrid,
  FiList
} from 'react-icons/fi';
import BlogCard from '../components/BlogCard';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Wrap samplePosts in useMemo to prevent recreation on every render
  const samplePosts = useMemo(() => [
    {
      id: 1,
      title: "The Future of Luxury Real Estate in Mumbai",
      excerpt: "Discover how Mumbai's luxury real estate market is evolving with new trends, technologies, and lifestyle preferences shaping the future of premium living.",
      content: "Mumbai's luxury real estate market is experiencing a remarkable transformation, driven by evolving lifestyle preferences, technological advancements, and changing demographics. The city's premium property segment is witnessing unprecedented growth, with developers focusing on creating holistic living experiences that go beyond traditional luxury...",
      author: "Ganesh Yeole",
      date: "2024-01-15",
      category: "Market Trends",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Luxury", "Mumbai", "Market Trends", "Premium Properties"],
      readTime: "5 min read",
      views: 1247,
      likes: 89,
      featured: true
    },
    {
      id: 2,
      title: "Investment Opportunities in Pune's Growing Real Estate Market",
      excerpt: "Explore the promising investment opportunities in Pune's rapidly expanding real estate market, from residential to commercial properties.",
      content: "Pune has emerged as one of India's most promising real estate investment destinations, offering a perfect blend of economic growth, infrastructure development, and quality of life. The city's real estate market is witnessing robust growth across all segments...",
      author: "Real Estate Team",
      date: "2024-01-12",
      category: "Investment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Investment", "Pune", "Commercial", "Residential"],
      readTime: "4 min read",
      views: 892,
      likes: 67,
      featured: false
    },
    {
      id: 3,
      title: "Sustainable Living: Green Buildings in Nashik",
      excerpt: "Learn about the growing trend of sustainable and green buildings in Nashik, and how they're reshaping the city's real estate landscape.",
      content: "Sustainability has become a cornerstone of modern real estate development, and Nashik is leading the way with innovative green building practices. The city's developers are increasingly adopting eco-friendly construction methods...",
      author: "Sustainability Expert",
      date: "2024-01-10",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Sustainability", "Green Buildings", "Nashik", "Eco-friendly"],
      readTime: "6 min read",
      views: 756,
      likes: 54,
      featured: true
    },
    {
      id: 4,
      title: "Smart Home Technology: The New Standard in Luxury Living",
      excerpt: "Discover how smart home technology is becoming the new standard in luxury real estate, offering convenience, security, and energy efficiency.",
      content: "Smart home technology has revolutionized the luxury real estate market, transforming how we live and interact with our living spaces. From automated lighting and climate control to advanced security systems...",
      author: "Tech Expert",
      date: "2024-01-08",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Smart Home", "Technology", "Luxury", "Automation"],
      readTime: "7 min read",
      views: 1103,
      likes: 78,
      featured: false
    },
    {
      id: 5,
      title: "RERA Compliance: What Homebuyers Need to Know",
      excerpt: "A comprehensive guide to RERA compliance and how it protects homebuyers' interests in the real estate market.",
      content: "The Real Estate (Regulation and Development) Act, 2016 (RERA) has brought significant transparency and accountability to India's real estate sector. For homebuyers, understanding RERA compliance is crucial...",
      author: "Legal Expert",
      date: "2024-01-05",
      category: "Legal",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["RERA", "Legal", "Homebuyers", "Compliance"],
      readTime: "8 min read",
      views: 1345,
      likes: 92,
      featured: true
    },
    {
      id: 6,
      title: "Co-living Spaces: The Future of Urban Living",
      excerpt: "Explore the growing trend of co-living spaces and how they're redefining urban living for millennials and young professionals.",
      content: "Co-living has emerged as a revolutionary concept in urban real estate, offering a perfect solution for the modern lifestyle needs of millennials and young professionals. These shared living spaces...",
      author: "Urban Planning Expert",
      date: "2024-01-03",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Co-living", "Urban Living", "Millennials", "Shared Spaces"],
      readTime: "5 min read",
      views: 678,
      likes: 45,
      featured: false
    }
  ], []);

  const categories = [
    { id: 'all', name: 'All Posts', count: samplePosts.length },
    { id: 'projects', name: 'Projects', count: samplePosts.filter(p => p.category === 'Projects').length },
    { id: 'market-analysis', name: 'Market Analysis', count: samplePosts.filter(p => p.category === 'Market Analysis').length },
    { id: 'guides', name: 'Guides', count: samplePosts.filter(p => p.category === 'Guides').length },
    { id: 'investment', name: 'Investment', count: samplePosts.filter(p => p.category === 'Investment').length },
    { id: 'technology', name: 'Technology', count: samplePosts.filter(p => p.category === 'Technology').length },
    { id: 'sustainability', name: 'Sustainability', count: samplePosts.filter(p => p.category === 'Sustainability').length }
  ];

  useEffect(() => {
    // Simulate loading posts
    const timer = setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [samplePosts]);

  useEffect(() => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.category.toLowerCase().replace(' ', '-') === selectedCategory
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [posts, searchQuery, selectedCategory]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
                            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Real Estate Blog | Ganesh Yeole Builders and Developers</title>
        <meta name="description" content="Stay updated with the latest real estate trends, project launches, market insights, and expert advice from Ganesh Yeole Builders and Developers." />
        <link rel="canonical" href={window.location.origin + '/blog'} />
        {/* Open Graph */}
        <meta property="og:title" content="Real Estate Blog | Ganesh Yeole Builders and Developers" />
        <meta property="og:description" content="Stay updated with the latest real estate trends, project launches, market insights, and expert advice from Ganesh Yeole Builders and Developers." />
        <meta property="og:url" content={window.location.origin + '/blog'} />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Real Estate Blog | Ganesh Yeole Builders and Developers" />
        <meta name="twitter:description" content="Stay updated with the latest real estate trends, project launches, market insights, and expert advice from Ganesh Yeole Builders and Developers." />
        {/* JSON-LD WebPage Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Real Estate Blog | Ganesh Yeole Builders and Developers",
            "description": "Stay updated with the latest real estate trends, project launches, market insights, and expert advice from Ganesh Yeole Builders and Developers.",
            "url": "${window.location.origin}/blog"
          }
        `}</script>
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Blog</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest real estate trends, project launches, market insights, and expert advice.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredPosts.length} Posts Found
              </h2>
              {searchQuery && (
                <p className="text-gray-600">
                  Search results for "{searchQuery}"
                </p>
              )}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {currentPosts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
              }
            >
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} viewMode={viewMode} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Posts Found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                View All Posts
              </button>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center items-center gap-2 mt-12"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-red-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
              >
                <FiArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog; 