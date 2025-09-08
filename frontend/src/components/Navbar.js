import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronRight, FaChevronUp } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Ensure this path is correct relative to Navbar.js
import logoDark from '../assets/logo.png'; // Placeholder, use different file if available
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

const ongoingProjects = [
  { name: 'Shree Ganesh Srushti', path: '/ShreeGaneshSrushti' },
  { name: 'Shree Ganesh Park', path: '/ShreeGaneshParkPhaseI' },
  { name: 'Shree Ganesh Heights', path: '/ShreeGaneshHeights' },
];

const Navbar = () => {
  const location = useLocation();
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [hoveredSubDropdown, setHoveredSubDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const [mobileSubDropdownOpen, setMobileSubDropdownOpen] = useState({});
  const { theme } = useTheme();

  const menu = [
    { name: 'Home', path: '/' },
    {
      name: 'Ongoing projects',
      dropdown: [
        {
          name: 'Ongoing projects',
          submenu: ongoingProjects,
        },
      ],
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
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 shadow-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gradient-to-r from-white to-gray-50 text-[#181818]'}`}>
      <div className="w-full flex items-center h-16 sm:h-20 px-2 sm:px-4">
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
        
        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 focus:outline-none ml-auto"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span className={`block w-6 sm:w-7 h-0.5 sm:h-1 mb-1 rounded transition-all ${theme === 'dark' ? 'bg-white' : 'bg-[#181818]'}`} />
          <span className={`block w-6 sm:w-7 h-0.5 sm:h-1 mb-1 rounded transition-all ${theme === 'dark' ? 'bg-white' : 'bg-[#181818]'}`} />
          <span className={`block w-6 sm:w-7 h-0.5 sm:h-1 rounded transition-all ${theme === 'dark' ? 'bg-white' : 'bg-[#181818]'}`} />
        </button>
        {/* Theme Switcher Button at far right */}
        <ThemeSwitcher />
        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-full z-40 transition-opacity duration-300 ${mobileMenuOpen ? (theme === 'dark' ? 'bg-black bg-opacity-70' : 'bg-[#181818] bg-opacity-30') : 'hidden'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Mobile Menu Drawer */}
        <div
          className={`lg:hidden fixed top-0 right-0 w-full max-w-sm h-full z-50 shadow-lg transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
        >
          <button
            className={`absolute top-4 right-4 text-2xl focus:outline-none ${theme === 'dark' ? 'text-white' : 'text-[#181818]'}`}
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            ×
          </button>
          <ul className="flex flex-col gap-2 mt-20 px-4 overflow-y-auto h-full pb-20">
            {menu.map((item, idx) => (
              <li key={item.name} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                                className={`w-full flex items-center justify-between px-3 py-3 text-base font-medium uppercase tracking-wide text-left hover:text-gold ${theme === 'dark' ? 'text-white' : 'text-[#181818]'}`}
                      onClick={() => setMobileDropdownOpen((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                    >
                      {item.name}
                      {mobileDropdownOpen[idx] ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                    </button>
                              {mobileDropdownOpen[idx] && (
                                <ul className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 mt-2">
                        {item.dropdown.map((drop, dIdx) => (
                          <li key={drop.name} className="relative">
                            {drop.submenu ? (
                              <>
                                <button
                                            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-left hover:text-gold ${theme === 'dark' ? 'text-white' : 'text-[#181818]'}`}
                                  onClick={() => setMobileSubDropdownOpen((prev) => ({ ...prev, [`${idx}-${dIdx}`]: !prev[`${idx}-${dIdx}`] }))}
                                >
                                  {drop.name}
                                  {mobileSubDropdownOpen[`${idx}-${dIdx}`] ? <FaChevronUp className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3" />}
                                </button>
                                          {mobileSubDropdownOpen[`${idx}-${dIdx}`] && (
                                            <ul className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 mt-2">
                                    {drop.submenu.map((sub) => (
                                      <li key={sub.name}>
                                        <Link
                                          to={sub.path}
                                          className={`block px-3 py-2 text-sm font-medium hover:text-gold ${theme === 'dark' ? 'text-white' : 'text-[#181818]'}`}
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          {sub.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            ) : (
                              <Link
                                to={drop.path}
                                className={`block px-3 py-2 text-sm font-medium hover:text-gold ${theme === 'dark' ? 'text-white' : 'text-[#181818]'}`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {drop.name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`block px-3 py-3 text-base font-medium uppercase tracking-wide hover:text-gold ${theme === 'dark' ? 'text-white' : 'text-[#181818]'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 