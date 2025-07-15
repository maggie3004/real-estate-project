import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const ongoingProjects = [
  { name: 'Shree Ganesh Park Phase II', path: '/ShreeGaneshParkPhaseII' },
  { name: 'Shree Ganesh Park Phase I', path: '/ShreeGaneshParkPhaseI' },
  { name: 'Shree Ganesh Heights', path: '/ShreeGaneshHeights' },
];
const completedProjects = [
  { name: 'Sai Shraddha Apartment', path: '/SaiShraddhaApartment' },
  { name: 'Vinayak Apartment', path: '/VinayakApartment' },
  { name: 'Shree Ganesh Avenue', path: '/ShreeGaneshAvenue' },
  { name: 'Modakeshwar Apartment', path: '/ModakeshwarApartment' },
];

const Navbar = () => {
  const location = useLocation();
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [hoveredSubDropdown, setHoveredSubDropdown] = useState(null);

  const menu = [
    {
      name: 'About Us',
      dropdown: [
        { name: 'Overview', path: '/about' },
        { name: 'Mission & Vision', path: '/about#mission' },
        { name: 'Sustainability', path: '/sustainability' },
        { name: 'Corporate Profile', path: '/about#profile' },
      ],
    },
    {
      name: 'Projects',
      dropdown: [
        {
          name: 'Ongoing Projects',
          submenu: ongoingProjects,
        },
        {
          name: 'Completed Projects',
          submenu: completedProjects,
        },
        { name: 'Milestones', path: '/milestones' },
      ],
    },
    { name: 'Awards', path: '/awards' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Events', path: '/events' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
  ];

  // Helper to check if a path is active
  const isActive = (path) => location.pathname === path || location.hash === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#181818] text-white border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 min-w-fit" aria-label="Go to homepage">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold tracking-tight">Sai Prasad Group</span>
        </Link>
        {/* Menu */}
        <ul className="flex items-center gap-2 lg:gap-6 h-full">
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
                    className={`px-4 py-2 h-full flex items-center gap-1 font-semibold uppercase tracking-wide transition-colors duration-200 ${hoveredDropdown === idx ? 'text-gold' : 'hover:text-gold'} ${isActive(item.path) ? 'text-gold' : ''}`}
                  >
                    {item.name}
                    <span className="ml-1">▼</span>
                  </button>
                  {/* Dropdown */}
                  {hoveredDropdown === idx && (
                    <div
                      className="absolute left-0 top-full min-w-[220px] bg-[#232323] border border-gray-800 rounded shadow-lg py-2 z-50 animate-fadeIn"
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
                                className="w-full text-left px-5 py-2 font-medium hover:bg-gold/10 hover:text-gold flex items-center justify-between"
                              >
                                {drop.name}
                                <span className="ml-2">▶</span>
                              </button>
                              {/* Submenu */}
                              {hoveredSubDropdown === dIdx && (
                                <div
                                  className="absolute left-full top-0 min-w-[220px] bg-[#232323] border border-gray-800 rounded shadow-lg py-2 z-50 animate-fadeIn"
                                  onMouseEnter={() => setHoveredSubDropdown(dIdx)}
                                  onMouseLeave={() => setHoveredSubDropdown(null)}
                                >
                                  {drop.submenu.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      to={sub.path}
                                      className="block px-5 py-2 font-medium hover:bg-gold/10 hover:text-gold"
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
                              className="block px-5 py-2 font-medium hover:bg-gold/10 hover:text-gold"
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
                  className={`px-4 py-2 h-full flex items-center font-semibold uppercase tracking-wide transition-colors duration-200 ${isActive(item.path) ? 'text-gold' : 'hover:text-gold'}`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
              </div>
    </nav>
  );
};

export default Navbar; 