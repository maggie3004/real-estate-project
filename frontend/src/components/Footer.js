import React from 'react';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="w-full py-8 px-4 mt-12 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white transition-colors duration-500">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className="font-bold text-lg tracking-wide">Sai Prasad Group</span>
        </div>
        <nav className="flex gap-6 flex-wrap">
          <a href="/" className="hover:underline hover:text-joy transition-colors duration-200">Home</a>
          <a href="/listings" className="hover:underline hover:text-joy transition-colors duration-200">Properties</a>
          <a href="/map" className="hover:underline hover:text-joy transition-colors duration-200">Map View</a>
          <a href="/contact" className="hover:underline hover:text-joy transition-colors duration-200">Contact</a>
          <a href="/blog" className="hover:underline hover:text-joy transition-colors duration-200">Blog</a>
        </nav>
        <div className="text-sm text-gray-200 dark:text-gray-400">&copy; {new Date().getFullYear()} Sai Prasad Group. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer; 