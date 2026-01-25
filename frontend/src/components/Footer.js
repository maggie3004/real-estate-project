import React from 'react';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const logoUrl = '/assets/logo.png';

function Footer() {
  return (
    <footer className="w-full bg-black text-gray-100 pt-8 pb-5 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Ganesh Yeole Builders & Developers Logo" loading="eager" width="200" height="80" className="h-12 sm:h-14 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                  Ganesh Yeole
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-400">
                  Builders & Developers
                </span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Building dreams and creating landmarks for over 20 years. Your trusted partner in real estate development across Nashik and Pune.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/ganesh-yeole-builders-5126763a8/"
                target="_blank" rel="noopener noreferrer"
                className="hover:text-gold transition-colors duration-200" aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.facebook.com/ganeshyeole_builders"
                target="_blank" rel="noopener noreferrer"
                className="hover:text-gold transition-colors duration-200" aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/ganeshyeole_builders"
                target="_blank" rel="noopener noreferrer"
                className="hover:text-gold transition-colors duration-200" aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@ganeshyeole.builders"
                target="_blank" rel="noopener noreferrer"
                className="hover:text-gold transition-colors duration-200" aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white border-b border-gold pb-1">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="/about" className="hover:text-gold transition-colors duration-200">About Us</a></li>
              <li><a href="/about-nashik" className="hover:text-gold transition-colors duration-200">About Nashik</a></li>
              <li><a href="/milestones" className="hover:text-gold transition-colors duration-200">Milestones</a></li>
              <li><a href="/awards" className="hover:text-gold transition-colors duration-200">Awards & Events</a></li>
              <li><a href="/sustainability" className="hover:text-gold transition-colors duration-200">Sustainability</a></li>
              <li><a href="/contact" className="hover:text-gold transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white border-b border-gold pb-1">Contact Info</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p>P. No. 14, Sneh Prasad, Vighnaharta Colony</p>
                  <p>Khutwad Nagar, Nashik - 08</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-gold flex-shrink-0" />
                <span>+91 70305 02111</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gold flex-shrink-0" />
                <span>ganeshyeolebuilders@gmail.com</span>
              </div>
            </div>
          </div>


        </div>

        {/* Brand Logos Section */}
        {/* Commented out for now - will be used in future */}
        {/* <div className="border-t border-gray-700 pt-4 mb-4">
          <h3 className="text-base font-semibold text-white text-center mb-4">Our Trusted Partners & Certifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200">
              <div className="text-gray-600 font-bold text-xs">ISO 9001</div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200">
              <div className="text-gray-600 font-bold text-xs">IGBC</div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200">
              <div className="text-gray-600 font-bold text-xs">CREDAI</div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200">
              <div className="text-gray-600 font-bold text-xs">MCHI</div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200">
              <div className="text-gray-600 font-bold text-xs">RERA</div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center h-12 hover:shadow-lg transition-shadow duration-200">
              <div className="text-gray-600 font-bold text-xs">GRIHA</div>
            </div>
          </div>
        </div> */}



        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-4 pb-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-xs text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} GANESH VASANT YEOLE. All rights reserved.
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 whitespace-nowrap">
              <a href="/privacy-policy" className="hover:text-gold transition-colors duration-200">
                Privacy Policy
              </a>

              <span className="text-gray-500 select-none flex items-center">
                |
              </span>

              <a href="/terms-of-service" className="hover:text-gold transition-colors duration-200">
                Terms of Service
              </a>
            </div>
            <div className="flex items-center gap-3">
              {/* Contact buttons removed per request */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 