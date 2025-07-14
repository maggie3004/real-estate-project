import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png'; // Replace with Shree Ganesh Builders logo if available
// Removed: import ThemeSwitcher from './ThemeSwitcher';
// Removed: import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  // Removed: const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      // setIsAuthenticated(true); // This line was removed as per the edit hint
      // setUser(JSON.parse(userData)); // This line was removed as per the edit hint
    }
  }, []);

  // Keyboard navigation handlers
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  const handleMenuKeyDown = (e, index) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % navItems.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + navItems.length) % navItems.length);
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(navItems.length - 1);
        break;
      default:
        break;
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Price', path: '/#price' },
    { name: 'Floor Plan', path: '/#floorplan' },
    { name: 'Amenities', path: '/#amenities' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'Location', path: '/#location' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-gold py-1' : 'bg-cute-bg/95 dark:bg-gray-900/80 py-2'} backdrop-blur-md border-b border-gold rounded-b-2xl w-full`}
      role="navigation"
      aria-label="Main navigation"
      style={{
        boxShadow: scrolled ? '0 4px 24px 0 rgba(255,215,0,0.10)' : undefined,
        transition: 'all 0.3s',
      }}
    >
      <div className="flex items-center justify-between h-16 w-full gap-4 px-0">
        {/* Left: Logo + Company Name */}
        <a href="#home" className="flex items-center gap-3 min-w-fit pl-4" aria-label="Go to homepage">
          <img src={logo} alt="Shree Ganesh Builders Logo" className="h-8 w-auto self-center drop-shadow-md" />
          <span className="text-xl lg:text-2xl font-playfair font-bold gold-text whitespace-nowrap leading-none flex items-center tracking-tight" style={{letterSpacing: '0.01em'}}>
            Shree Ganesh Builders
          </span>
        </a>
        {/* Center: Navigation Links */}
        <div className="flex-1 flex items-center justify-center gap-1 md:gap-2 lg:gap-4 min-w-0 overflow-x-auto">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -2 }}
              className="relative"
              role="none"
            >
              <a
                href={item.path.replace('/#', '#')}
                className={`nav-link flex items-center space-x-1 font-quicksand text-base md:text-lg px-3 py-1 rounded-full transition-all duration-200 font-semibold`}
                role="menuitem"
                aria-label={`Navigate to ${item.name}`}
                style={{ color: '#fff', fontFamily: 'Quicksand, Nunito, Poppins, ui-sans-serif, system-ui, sans-serif', opacity: 1, zIndex: 10, fontWeight: location.hash === item.path.replace('/#', '#') ? 'bold' : '600' }}
              >
                <span>{item.name}</span>
              </a>
              {/* Gold underline for active */}
              {location.hash === item.path.replace('/#', '#') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-4 right-4 h-1 rounded-full bg-gold"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>
        {/* Right: Enquire Now Button & Mobile Menu Button */}
        <div className="flex items-center gap-2 min-w-fit pr-4">
          <a
            href="#contact"
            className="btn-primary bg-gold text-white font-semibold px-3 py-1 rounded-full shadow-gold hover:bg-rose hover:text-gold transition-all duration-200 hidden md:inline-flex items-center justify-center text-base h-auto min-w-fit"
            style={{ fontFamily: 'Quicksand, Nunito, Poppins, ui-sans-serif, system-ui, sans-serif', lineHeight: '1.2' }}
          >
            Enquire Now
          </a>
          {/* Mobile Menu Button */}
          <motion.button
            ref={menuButtonRef}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-gold hover:text-rose rounded-lg"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
          >
            {menuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </motion.button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 border-t border-gold shadow-gold rounded-b-2xl"
            role="menu"
            aria-label="Mobile navigation menu"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <div className="px-4 py-6">
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navItems.indexOf(item) * 0.1 }}
                    role="none"
                  >
                    <a
                      href={item.path.replace('/#', '#')}
                      onClick={() => setMenuOpen(false)}
                      onKeyDown={(e) => handleMenuKeyDown(e, index)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.hash === item.path.replace('/#', '#') ? 'gold-text bg-gold/10 font-bold' : 'text-gray-700 hover:text-gold hover:bg-gold/10'} ${focusedIndex === index ? 'ring-2 ring-gold ring-offset-2' : ''}`}
                      role="menuitem"
                      aria-current={location.hash === item.path.replace('/#', '#') ? 'page' : undefined}
                      tabIndex={focusedIndex === index ? 0 : -1}
                      style={{ fontFamily: 'Quicksand, Nunito, Poppins, ui-sans-serif, system-ui, sans-serif' }}
                    >
                      <span className="font-medium">{item.name}</span>
                    </a>
                  </motion.div>
                ))}
                <a
                  href="#contact"
                  className="btn-primary bg-gold text-white font-bold px-6 py-2 rounded-full shadow-gold hover:bg-rose hover:text-gold transition-all duration-200 block mt-4"
                  style={{ fontFamily: 'Quicksand, Nunito, Poppins, ui-sans-serif, system-ui, sans-serif' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 