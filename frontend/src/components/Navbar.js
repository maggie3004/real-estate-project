import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const ongoingProjects = [
  { name: 'Shree Ganesh Park Phase II', path: '/ShreeGaneshParkPhaseII' },
  { name: 'ShreeGaneshParkPhaseI', path: '/ShreeGaneshParkPhaseI' },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const [mobileSubDropdownOpen, setMobileSubDropdownOpen] = useState({});

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
    { name: 'Contact Us', path: '/contact' },
  ];

  // Helper to check if a path is active
  const isActive = (path) => location.pathname === path || location.hash === path;

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50">
      <div className="w-full flex items-center h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 min-w-fit" aria-label="Go to homepage">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold tracking-tight">Ganesh Yeole Builders and Developers</span>
        </Link>
        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-2 lg:gap-6 h-full flex-1 justify-center">
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
                    className={`px-4 py-2 h-full flex items-center gap-1 font-semibold uppercase tracking-wide nav-link ${hoveredDropdown === idx ? 'text-[#FFD700] border-b-2 border-[#FFD700]' : ''} ${isActive(item.path) ? 'text-[#B22222] border-b-2 border-[#FFD700]' : ''}`}
                  >
                    {item.name}
                    <span className="ml-1">▼</span>
                  </button>
                  {/* Dropdown */}
                  {hoveredDropdown === idx && (
                    <div
                      className="absolute left-0 top-full min-w-[220px] border border-[#FFD700] rounded shadow-lg py-2 z-50 bg-white animate-fadeIn"
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
                                className="w-full text-left px-5 py-2 font-medium flex items-center justify-between hover:text-[#FFD700]"
                              >
                                {drop.name}
                                <span className="ml-2">▶</span>
                              </button>
                              {/* Submenu */}
                              {hoveredSubDropdown === dIdx && (
                                <div
                                  className="absolute left-full top-0 min-w-[220px] border border-[#FFD700] rounded shadow-lg py-2 z-50 bg-white animate-fadeIn"
                                  onMouseEnter={() => setHoveredSubDropdown(dIdx)}
                                  onMouseLeave={() => setHoveredSubDropdown(null)}
                                >
                                  {drop.submenu.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      to={sub.path}
                                      className="block px-5 py-2 font-medium hover:text-[#FFD700]"
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
                              className="block px-5 py-2 font-medium hover:text-[#FFD700]"
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
                  className={`px-4 py-2 h-full flex items-center font-semibold uppercase tracking-wide nav-link ${isActive(item.path) ? 'text-[#B22222] border-b-2 border-[#FFD700]' : ''}`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none ml-auto"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span className="block w-7 h-1 mb-1 rounded bg-black" />
          <span className="block w-7 h-1 mb-1 rounded bg-black" />
          <span className="block w-7 h-1 rounded bg-black" />
        </button>
        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-full z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'bg-black bg-opacity-30' : 'hidden'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Mobile Menu Drawer */}
        <div
          className={`lg:hidden fixed top-0 right-0 w-72 max-w-full h-full z-50 shadow-lg transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} bg-white`}
        >
          <button
            className="absolute top-4 right-4 text-2xl focus:outline-none text-black"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            ×
          </button>
          <ul className="flex flex-col gap-2 mt-16 px-6">
            {menu.map((item, idx) => (
              <li key={item.name} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-2 py-3 font-semibold uppercase tracking-wide text-left hover:text-[#FFD700] text-black"
                      onClick={() => setMobileDropdownOpen((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                    >
                      {item.name}
                      <span>{mobileDropdownOpen[idx] ? '▲' : '▼'}</span>
                    </button>
                    {mobileDropdownOpen[idx] && (
                      <ul className="pl-4 border-l border-[#FFD700]">
                        {item.dropdown.map((drop, dIdx) => (
                          <li key={drop.name} className="relative">
                            {drop.submenu ? (
                              <>
                                <button
                                  className="w-full flex items-center justify-between px-2 py-2 font-medium text-left hover:text-[#FFD700] text-black"
                                  onClick={() => setMobileSubDropdownOpen((prev) => ({ ...prev, [`${idx}-${dIdx}`]: !prev[`${idx}-${dIdx}`] }))}
                                >
                                  {drop.name}
                                  <span>{mobileSubDropdownOpen[`${idx}-${dIdx}`] ? '▲' : '▶'}</span>
                                </button>
                                {mobileSubDropdownOpen[`${idx}-${dIdx}`] && (
                                  <ul className="pl-4 border-l border-[#FFD700]">
                                    {drop.submenu.map((sub) => (
                                      <li key={sub.name}>
                                        <Link
                                          to={sub.path}
                                          className="block px-2 py-2 font-medium hover:text-[#FFD700] text-black"
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
                                className="block px-2 py-2 font-medium hover:text-[#FFD700] text-black"
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
                    className={`block px-2 py-3 font-semibold uppercase tracking-wide hover:text-[#FFD700] text-black ${isActive(item.path) ? 'text-[#B22222] border-b-2 border-[#FFD700]' : ''}`}
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