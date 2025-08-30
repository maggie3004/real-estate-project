import React from 'react';
import logo from '../assets/logo.png';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBuilding, FaLeaf, FaAward } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-white text-black pt-8 pb-4 px-4 mt-8 border-t-2 border-[#FFD700]">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
              <span className="font-bold text-lg tracking-wide text-black">Ganesh Yeole Builders</span>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              Building dreams and creating landmarks for over 16 years. Your trusted partner in real estate development across Nashik, Mumbai, and Pune.
            </p>
            <div className="flex gap-3">
              <button className="hover:text-[#FFD700] transition-colors duration-200" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </button>
              <button className="hover:text-[#FFD700] transition-colors duration-200" aria-label="Facebook">
                <FaFacebook size={18} />
              </button>
              <button className="hover:text-[#FFD700] transition-colors duration-200" aria-label="Instagram">
                <FaInstagram size={18} />
              </button>
              <button className="hover:text-[#FFD700] transition-colors duration-200" aria-label="YouTube">
                <FaYoutube size={18} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-black border-b-2 border-[#FFD700] pb-1">Quick Links</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><a href="/about" className="hover:text-[#FFD700] transition-colors duration-200">About Us</a></li>
              <li><a href="/projects" className="hover:text-[#FFD700] transition-colors duration-200">Our Projects</a></li>
              <li><a href="/milestones" className="hover:text-[#FFD700] transition-colors duration-200">Milestones</a></li>
              <li><a href="/awards" className="hover:text-[#FFD700] transition-colors duration-200">Awards & Events</a></li>
              <li><a href="/sustainability" className="hover:text-[#FFD700] transition-colors duration-200">Sustainability</a></li>
              <li><a href="/contact" className="hover:text-[#FFD700] transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-black border-b-2 border-[#FFD700] pb-1">Contact Info</h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-[#FFD700] mt-0.5 flex-shrink-0" />
                <div>
                  <p>Sai Prasad House, 123 Main Road</p>
                  <p>Nashik, Maharashtra 422001</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#FFD700] flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-[#FFD700] flex-shrink-0" />
                <span>info@ganeshyoelebuilders.com</span>
              </div>
            </div>
          </div>

          {/* About Nashik */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-black border-b-2 border-[#FFD700] pb-1">About Nashik</h3>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed text-sm">
                Nashik, the "Wine Capital of India," is a rapidly growing city in Maharashtra known for its spiritual significance, educational institutions, and emerging IT sector.
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <FaBuilding className="text-[#FFD700]" />
                  <span>Fastest Growing Real Estate Market</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLeaf className="text-[#FFD700]" />
                  <span>Pleasant Climate & Green Environment</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaAward className="text-[#FFD700]" />
                  <span>Excellent Connectivity & Infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Logos Section */}
        <div className="border-t-2 border-[#FFD700] pt-4 mb-4">
          <h3 className="text-base font-semibold text-black text-center mb-4">Our Trusted Partners & Certifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
            {/* Sample Brand Logos - Replace with actual logos */}
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200 border border-[#FFD700]">
              <div className="text-gray-700 font-bold text-xs">ISO 9001</div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200 border border-[#FFD700]">
              <div className="text-gray-700 font-bold text-xs">IGBC</div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200 border border-[#FFD700]">
              <div className="text-gray-700 font-bold text-xs">CREDAI</div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200 border border-[#FFD700]">
              <div className="text-gray-700 font-bold text-xs">MCHI</div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200 border border-[#FFD700]">
              <div className="text-gray-700 font-bold text-xs">RERA</div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200 border border-[#FFD700]">
              <div className="text-gray-700 font-bold text-xs">GRIHA</div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="border-t-2 border-[#FFD700] pt-4 mb-4">
          <h3 className="text-base font-semibold text-black text-center mb-4">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white border border-[#FFD700] rounded-lg">
              <h4 className="font-semibold text-black mb-1 text-sm">Residential Projects</h4>
              <p className="text-gray-700 text-xs">Luxury apartments, villas, and affordable housing solutions</p>
            </div>
            <div className="text-center p-3 bg-white border border-[#FFD700] rounded-lg">
              <h4 className="font-semibold text-black mb-1 text-sm">Commercial Projects</h4>
              <p className="text-gray-700 text-xs">Office spaces, retail complexes, and mixed-use developments</p>
            </div>
            <div className="text-center p-3 bg-white border border-[#FFD700] rounded-lg">
              <h4 className="font-semibold text-black mb-1 text-sm">Property Management</h4>
              <p className="text-gray-700 text-xs">Complete property management and maintenance services</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t-2 border-[#FFD700] pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-xs text-gray-700">
              &copy; {new Date().getFullYear()} Ganesh Yeole Builders and Developers. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-700">
              <button className="hover:text-[#FFD700] transition-colors duration-200">Privacy Policy</button>
              <span>|</span>
              <button className="hover:text-[#FFD700] transition-colors duration-200">Terms of Service</button>
              <span>|</span>
              <button className="hover:text-[#FFD700] transition-colors duration-200">Disclaimer</button>
            </div>
            <div className="text-xs text-gray-700">
              Powered by <span className="font-semibold text-black">Ganesh Yeole Builders</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 