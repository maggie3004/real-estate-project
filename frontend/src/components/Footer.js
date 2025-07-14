import React from 'react';
import logo from '../assets/logo.png';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaDownload, FaUserTie } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-[#181818] text-gray-100 pt-12 pb-6 px-4 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-4">
        {/* Contact Column */}
        <div className="flex-1 min-w-[220px] mb-8 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <span className="font-bold text-xl tracking-wide text-white">Sai Prasad Group</span>
          </div>
          <div className="mb-2 text-lg font-semibold text-white">Contact</div>
          <div className="mb-2 text-gray-300">Sai Prasad House, 123 Main Road, Nashik, Maharashtra 422001</div>
          <div className="flex items-center gap-2 mb-2 text-gray-300">
            <FaPhoneAlt className="inline-block text-gold" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2 mb-4 text-gray-300">
            <FaEnvelope className="inline-block text-gold" />
            <span>info@saiprasadgroup.com</span>
          </div>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-gold" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            <a href="#" className="hover:text-gold" aria-label="Facebook"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-gold" aria-label="Instagram"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-gold" aria-label="YouTube"><FaYoutube size={20} /></a>
          </div>
        </div>
        {/* Value Added Services Column */}
        <div className="flex-1 min-w-[200px] mb-8 md:mb-0">
          <div className="mb-4 text-lg font-semibold text-white">Value Added Services</div>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-gold">Development Management</a></li>
            <li><a href="#" className="hover:text-gold">Leasing & Resale</a></li>
            <li><a href="#" className="hover:text-gold">Interior Fitout Management</a></li>
            <li><a href="#" className="hover:text-gold">Facility Management</a></li>
            <li><a href="#" className="hover:text-gold">Portfolio Management</a></li>
          </ul>
        </div>
        {/* Portfolio Column */}
        <div className="flex-1 min-w-[200px]">
          <div className="mb-4 text-lg font-semibold text-white">Portfolio</div>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-gold">Offices</a></li>
            <li><a href="#" className="hover:text-gold">Homes</a></li>
            <li><a href="#" className="hover:text-gold">Plotting</a></li>
            <li><a href="#" className="flex items-center gap-2 hover:text-gold"><FaUserTie className="inline-block text-gold" /> Employee Portal</a></li>
            <li><a href="#" className="flex items-center gap-2 hover:text-gold"><FaDownload className="inline-block text-gold" /> Downloads</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <div className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} Sai Prasad Group. All rights reserved.</div>
        <div>
          <a href="#" className="hover:text-gold mx-2">Disclaimer</a>|
          <a href="#" className="hover:text-gold mx-2">Privacy Policy</a>
        </div>
        <div className="text-xs">Powered by <span className="font-semibold text-white">Your Company</span></div>
      </div>
    </footer>
  );
}

export default Footer; 