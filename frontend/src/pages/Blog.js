import React, { useState, useEffect } from 'react';
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

  // Sample blog posts data
  const samplePosts = [
    {
      id: 1,
      title: "World Environment Day 2025: Our Commitment to Sustainable Development",
      summary: "Discover how we celebrated World Environment Day 2025 and our ongoing commitment to sustainable real estate development. Learn about our green initiatives and eco-friendly projects.",
      content: "On World Environment Day 2025, we reaffirmed our commitment to sustainable development...",
      slug: "world-environment-day-2025",
      category: "Sustainability",
      author: "Environmental Team",
      publishDate: "2025-06-05",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
      tags: ["Environment", "Sustainability", "Green Building"],
      views: 1247,
      likes: 89,
      featured: true
    },
    {
      id: 2,
      title: "Project Launch: Shri Ganesh Heights - Luxury Living Redefined",
      summary: "Experience luxury living at its finest with our latest project, Shri Ganesh Heights. Discover world-class amenities, premium finishes, and exceptional location.",
      content: "We are excited to announce the launch of our flagship project, Shri Ganesh Heights...",
      slug: "shri-ganesh-heights-launch",
      category: "Projects",
      author: "Marketing Team",
      publishDate: "2025-05-28",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      tags: ["Luxury", "New Launch", "Premium"],
      views: 2156,
      likes: 156,
      featured: true
    },
    {
      id: 3,
      title: "Real Estate Market Trends 2025: What Buyers Need to Know",
      summary: "Stay ahead of the curve with our comprehensive analysis of real estate market trends for 2025. Learn about emerging opportunities and investment strategies.",
      content: "The real estate market in 2025 is experiencing significant changes...",
      slug: "real-estate-trends-2025",
      category: "Market Analysis",
      author: "Research Team",
      publishDate: "2025-05-20",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      tags: ["Market Trends", "Investment", "Analysis"],
      views: 3421,
      likes: 234,
      featured: false
    },
    {
      id: 4,
      title: "Home Buying Guide: 10 Essential Tips for First-Time Buyers",
      summary: "Navigate the home buying process with confidence using our comprehensive guide. From pre-approval to closing, we cover everything you need to know.",
      content: "Buying your first home is one of the most significant financial decisions...",
      slug: "first-time-buyer-guide",
      category: "Guides",
      author: "Customer Success Team",
      publishDate: "2025-05-15",
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      tags: ["First Time Buyer", "Guide", "Tips"],
      views: 1897,
      likes: 123,
      featured: false
    },
    {
      id: 5,
      title: "Investment Properties: Maximizing Your ROI in 2025",
      summary: "Learn proven strategies for maximizing returns on investment properties. Discover the best locations, property types, and management approaches.",
      content: "Investment properties continue to be a popular choice for wealth building...",
      slug: "investment-properties-roi-2025",
      category: "Investment",
      author: "Investment Team",
      publishDate: "2025-05-10",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      tags: ["Investment", "ROI", "Strategy"],
      views: 2765,
      likes: 198,
      featured: false
    },
    {
      id: 6,
      title: "Smart Home Technology: The Future of Modern Living",
      summary: "Explore the latest smart home technologies that are transforming modern living. From security to energy efficiency, discover what's possible.",
      content: "Smart home technology is revolutionizing how we live and interact with our homes...",
      slug: "smart-home-technology-2025",
      category: "Technology",
      author: "Tech Team",
      publishDate: "2025-05-05",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      tags: ["Smart Home", "Technology", "Innovation"],
      views: 1543,
      likes: 87,
      featured: false
    }
  ];

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
    // Simulate loading
    setTimeout(() => {
      setPosts(samplePosts);
      setFilteredPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

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
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Real Estate Blog | Shree Ganesh Real Estate</title>
        <meta name="description" content="Stay updated with the latest real estate trends, project launches, market insights, and expert advice from Shree Ganesh Real Estate." />
        <link rel="canonical" href={window.location.origin + '/blog'} />
        {/* Open Graph */}
        <meta property="og:title" content="Real Estate Blog | Shree Ganesh Real Estate" />
        <meta property="og:description" content="Stay updated with the latest real estate trends, project launches, market insights, and expert advice from Shree Ganesh Real Estate." />
        <meta property="og:image" content={window.location.origin + '/og-image.jpg'} />
        <meta property="og:url" content={window.location.origin + '/blog'} />
        <meta property="og:type" content="blog" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Real Estate Blog | Shree Ganesh Real Estate" />
        <meta name="twitter:description" content="Stay updated with the latest real estate trends, project launches, market insights, and expert advice from Shree Ganesh Real Estate." />
        <meta name="twitter:image" content={window.location.origin + '/twitter-image.jpg'} />
        {/* JSON-LD Blog Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Real Estate Blog | Shree Ganesh Real Estate",
            "description": "Stay updated with the latest real estate trends, project launches, market insights, and expert advice from Shree Ganesh Real Estate.",
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-primary-600 text-white' 
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
                      ? 'bg-primary-600 text-white'
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
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
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
                      ? 'bg-primary-600 text-white'
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