import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronRight, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import logoDark from '../assets/logo.png';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

const ongoingProjects = [
  { name: 'Shree Ganesh Srushti', path: '/ShreeGaneshSrushti' },
  { name: 'Shree Ganesh Park Phase I', path: '/ShreeGaneshParkPhaseI' },
  { name: 'Shree Ganesh Heights', path: '/ShreeGaneshHeights' },
];

const Navbar = () => {
  const location = useLocation();
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [hoveredSubDropdown, setHoveredSubDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const [mobileSubDropdownOpen, setMobileSubDropdownOpen] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { theme } = useTheme();

  // Handle scroll effect for navbar with simplified logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background
      setIsScrolled(currentScrollY > 10);
      
      // Only apply scroll behavior on homepage
      if (location.pathname !== '/') {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      
      // Simple scroll direction detection
      const isScrollingUp = currentScrollY < lastScrollY.current;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
      
      // Handle show/hide based on scroll direction
      if (mobileMenuOpen || currentScrollY <= 10) {
        // Always show navbar when mobile menu is open or at top of page
        setIsVisible(true);
      } else if (isScrollingUp && scrollDifference > 5) {
        // Scrolling up with 5px threshold - show navbar immediately
        console.log('Showing navbar: scrolling up', { currentScrollY, lastScrollY: lastScrollY.current, scrollDifference });
        setIsVisible(true);
      } else if (isScrollingDown && currentScrollY > 100 && scrollDifference > 5) {
        // Scrolling down and past 100px with 5px threshold - hide navbar
        console.log('Hiding navbar: scrolling down', { currentScrollY, lastScrollY: lastScrollY.current, scrollDifference });
        setIsVisible(false);
      }
      
      // Update last scroll position immediately
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen, location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const menu = [
    { name: 'Home', path: '/' },
    {
      name: 'Ongoing projects',
      dropdown: ongoingProjects,
    },
    { name: 'Milestones', path: '/milestones' },
    {
      name: 'About us',
      dropdown: [
        { name: 'Overview', path: '/about' },
        { name: 'Vision and mission', path: '/about#mission' },
        { name: 'Sustainability', path: '/sustainability' },
      ],
    },
    {
      name: 'Events',
      dropdown: [
        { name: 'Events', path: '/events' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Awards', path: '/awards' },
      ],
    },
    { name: 'About Nashik', path: '/about-nashik' },
    { name: 'Contact us', path: '/contact' },
  ];

  // Helper to check if a path is active
  const isActive = (path) => location.pathname === path || location.hash === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 shadow-lg navbar-scroll-behavior ${
      !isVisible ? 'hidden' : ''
    } ${
      theme === 'dark' 
        ? `bg-black text-white ${isScrolled ? 'backdrop-blur-md bg-black/95' : 'bg-black'}` 
        : `bg-gradient-to-r from-white to-gray-50 text-[#181818] ${isScrolled ? 'backdrop-blur-md bg-white/95' : 'bg-gradient-to-r from-white to-gray-50'}`
    }`}>
      <div className="w-full flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo and Company Name */}
        <Link to="/" className="flex items-center gap-2 sm:gap-4 min-w-fit" aria-label="Go to homepage">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={theme === 'dark' ? logo : logoDark} alt="Logo" className="h-8 sm:h-10 w-auto transition-all duration-300" />
            <div className="flex flex-col">
              <span className={`text-sm sm:text-lg font-bold tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-[#181818]'}`}>
                Ganesh Yeole
              </span>
              <span className={`text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Builders & Developers
              </span>
              <span className={`text-xs font-medium tracking-wider transition-colors duration-300 hidden sm:block ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                Building Dreams Since 2007
              </span>
            </div>
          </div>
        </Link>
        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-1 lg:gap-3 h-full flex-1 justify-center">
          {menu.map((item, idx) => (
            <li
              key={item.name}
              className="relative h-full"
              onMouseEnter={() => setHoveredDropdown(idx)}
              onMouseLeave={() => setHoveredDropdown(null)}
            >
              {item.dropdown ? (
                <>
                  <button
                    className={`px-2 py-2 h-full flex items-center gap-1 text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${hoveredDropdown === idx ? 'text-gold' : 'hover:text-gold'} ${isActive(item.path) ? 'text-gold' : ''} ${theme === 'dark' ? 'text-white' : 'text-[#181818] hover:text-gold'}`}
                  >
                    {item.name}
                    <FaChevronDown className="ml-1 w-3 h-3" />
                  </button>
                  {/* Dropdown */}
                  {hoveredDropdown === idx && (
                    <div
                      className={`absolute left-0 top-full min-w-[220px] border border-gray-800 rounded shadow-lg py-2 z-50 animate-fadeIn ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
                      onMouseEnter={() => setHoveredDropdown(idx)}
                      onMouseLeave={() => setHoveredDropdown(null)}
                    >
                      {item.dropdown.map((drop, dIdx) => (
                        <div
                          key={drop.name}
                          className="relative group"
                          onMouseEnter={() => setHoveredSubDropdown(dIdx)}
                          onMouseLeave={() => setHoveredSubDropdown(null)}
                        >
                          {drop.submenu ? (
                            <>
                              <button
                                className={`w-full text-left px-3 py-1.5 text-sm font-medium flex items-center justify-between hover:bg-gold/10 hover:text-gold ${theme === 'dark' ? 'text-white' : 'text-[#181818]'}`}
                              >
                                {drop.name}
                                <FaChevronRight className="ml-2 w-3 h-3" />
                              </button>
                              {/* Submenu */}
                              {hoveredSubDropdown === dIdx && (
                                <div
                                  className={`absolute left-full top-0 min-w-[220px] border border-gray-800 rounded shadow-lg py-2 z-50 animate-fadeIn ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
                                  onMouseEnter={() => setHoveredSubDropdown(dIdx)}
                                  onMouseLeave={() => setHoveredSubDropdown(null)}
                                >
                                  {drop.submenu.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      to={sub.path}
                                      className={`block px-3 py-1.5 text-sm font-medium hover:bg-gold/10 hover:text-gold ${theme === 'dark' ? 'text-white' : 'text-[#181818]'}`}
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              to={drop.path}
                              className={`block px-3 py-1.5 text-sm font-medium hover:bg-gold/10 hover:text-gold ${theme === 'dark' ? 'text-white' : 'text-[#181818]'}`}
                            >
                              {drop.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`px-2 py-2 h-full flex items-center text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${isActive(item.path) ? 'text-gold' : 'hover:text-gold'} ${theme === 'dark' ? 'text-white' : 'text-[#181818] hover:text-gold'}`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        {/* Desktop Theme Switcher */}
        <div className="hidden lg:flex items-center">
          <ThemeSwitcher />
        </div>
        
        {/* Mobile Menu Button and Theme Switcher */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeSwitcher />
          <button
            className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-lg transition-all duration-300"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <motion.div
              className="flex flex-col justify-center items-center w-6 h-6"
              animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className={`block w-6 h-0.5 rounded transition-all duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-[#181818]'}`}
                animate={mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              />
              <motion.span
                className={`block w-6 h-0.5 rounded transition-all duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-[#181818]'}`}
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className={`block w-6 h-0.5 rounded transition-all duration-300 ${theme === 'dark' ? 'bg-white' : 'bg-[#181818]'}`}
                animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              />
            </motion.div>
          </button>
        </div>
        {/* Mobile Menu Overlay and Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lg:hidden fixed top-0 right-0 w-full max-w-xs h-screen z-50 mobile-menu-drawer backdrop-blur-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)'
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/20">
                  <h2 className="text-xl font-bold text-white">Menu</h2>
                  <button
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                    aria-label="Close menu"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Navigation Menu */}
                <div className="flex-1 overflow-y-auto py-4 mobile-menu-content">
                  <ul className="space-y-2 px-4">
                    {menu.map((item, idx) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative"
                      >
                        {item.dropdown ? (
                          <>
                            <button
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-white/10 ${
                                isActive(item.path) 
                                  ? 'text-yellow-300 bg-yellow-300/10' 
                                  : 'text-white'
                              }`}
                              onClick={() => setMobileDropdownOpen((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                            >
                              <span className="font-medium">{item.name}</span>
                              <motion.div
                                animate={{ rotate: mobileDropdownOpen[idx] ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <FaChevronDown className="w-4 h-4" />
                              </motion.div>
                            </button>
                            
                            <AnimatePresence>
                              {mobileDropdownOpen[idx] && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-4 mt-2 space-y-1">
                                    {item.dropdown.map((drop, dIdx) => (
                                      <li key={drop.name}>
                                        {drop.submenu ? (
                                          <>
                                            <button
                                              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 hover:bg-white/10 text-gray-200"
                                              onClick={() => setMobileSubDropdownOpen((prev) => ({ ...prev, [`${idx}-${dIdx}`]: !prev[`${idx}-${dIdx}`] }))}
                                            >
                                              <span className="text-sm font-medium">{drop.name}</span>
                                              <motion.div
                                                animate={{ rotate: mobileSubDropdownOpen[`${idx}-${dIdx}`] ? 90 : 0 }}
                                                transition={{ duration: 0.2 }}
                                              >
                                                <FaChevronRight className="w-3 h-3" />
                                              </motion.div>
                                            </button>
                                            
                                            <AnimatePresence>
                                              {mobileSubDropdownOpen[`${idx}-${dIdx}`] && (
                                                <motion.ul
                                                  initial={{ height: 0, opacity: 0 }}
                                                  animate={{ height: 'auto', opacity: 1 }}
                                                  exit={{ height: 0, opacity: 0 }}
                                                  transition={{ duration: 0.3 }}
                                                  className="overflow-hidden pl-4 mt-1 space-y-1"
                                                >
                                                  {drop.submenu.map((sub) => (
                                                    <li key={sub.name}>
                                                      <Link
                                                        to={sub.path}
                                                        className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-white/10 ${
                                                          isActive(sub.path)
                                                            ? 'text-yellow-300 bg-yellow-300/10'
                                                            : 'text-gray-300'
                                                        }`}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                      >
                                                        {sub.name}
                                                      </Link>
                                                    </li>
                                                  ))}
                                                </motion.ul>
                                              )}
                                            </AnimatePresence>
                                          </>
                                        ) : (
                                          <Link
                                            to={drop.path}
                                            className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-white/10 ${
                                              isActive(drop.path)
                                                ? 'text-yellow-300 bg-yellow-300/10'
                                                : 'text-gray-300'
                                            }`}
                                            onClick={() => setMobileMenuOpen(false)}
                                          >
                                            {drop.name}
                                          </Link>
                                        )}
                                      </li>
                                    ))}
                                  </div>
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            className={`block px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                              isActive(item.path)
                                ? 'text-yellow-300 bg-yellow-300/10'
                                : 'text-white'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Footer */}
                <div className="p-6 border-t border-white/20">
                  <div className="text-center">
                    <p className="text-sm text-gray-300">
                      Building Dreams Since 2007
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

// Custom CSS for mobile menu
const mobileMenuStyles = `
  /* Prevent body scroll when mobile menu is open */
  body.mobile-menu-open {
    overflow: hidden !important;
    position: fixed !important;
    width: 100% !important;
  }
  
  /* Website Dark Theme Mobile Menu Styles */
  .mobile-menu-drawer {
    box-shadow: -10px 0 30px rgba(17, 24, 39, 0.4);
    background: linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  
  /* Custom scrollbar for mobile menu */
  .mobile-menu-content::-webkit-scrollbar {
    width: 4px;
  }
  
  .mobile-menu-content::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .mobile-menu-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  
  .mobile-menu-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = mobileMenuStyles;
  document.head.appendChild(styleSheet);
} 