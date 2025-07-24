import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiDownload, FiMessageSquare } from 'react-icons/fi';
import EnquiryModal from './EnquiryModal';
import Chatbot from './Chatbot';
import { useLocation } from 'react-router-dom';

const whatsappNumber = 'YOUR_PHONE_NUMBER'; // Replace with your WhatsApp number
const whatsappLink = `https://wa.me/${whatsappNumber}`;
const callNumber = '+919999999999'; // Replace with your call number
const brochureUrl = '/Shri Ganesh Heights.pdf'; // Replace with your brochure path

const FloatingActions = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Floating Action Area */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
        {/* WhatsApp */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6" />
        </a>
        {/* Call */}
        <a
          href={`tel:${callNumber}`}
          className="bg-gold hover:bg-primary-500 text-primary-700 hover:text-gold p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 border-2 border-gold"
          aria-label="Call Now"
          title="Call Now"
        >
          <FiPhone className="w-6 h-6" />
        </a>
        {/* Download Brochure (not on home page) */}
        {location.pathname !== '/' && (
          <a
            href={brochureUrl}
            download
            className="bg-gradient-to-r from-gold to-primary-500 hover:from-primary-500 hover:to-gold text-primary-700 hover:text-gold p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 border-2 border-gold"
            aria-label="Download Brochure"
            title="Download Brochure"
          >
            <FiDownload className="w-6 h-6" />
          </a>
        )}
        {/* Enquiry */}
        <button
          onClick={() => setEnquiryOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
          aria-label="Enquiry"
          title="Enquiry"
        >
          ?
        </button>
        {/* Chatbot */}
        <button
          onClick={() => setShowChatbot(v => !v)}
          className="bg-primary-700 hover:bg-gold text-gold hover:text-primary-700 p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 border-2 border-gold focus:outline-none"
          aria-label="Open Chatbot"
          title="Open Chatbot"
        >
          <FiMessageSquare className="w-6 h-6" />
        </button>
      </div>
      {/* Enquiry Modal */}
      {enquiryOpen && <EnquiryModal open={enquiryOpen} setOpen={setEnquiryOpen} />}
      {/* Chatbot Popup */}
      <div
        style={{
          position: 'fixed',
          bottom: 110,
          right: 32,
          zIndex: 1050,
          pointerEvents: showChatbot ? 'auto' : 'none',
          transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), opacity 0.3s',
          transform: showChatbot ? 'scale(1)' : 'scale(0.7)',
          opacity: showChatbot ? 1 : 0,
        }}
      >
        {showChatbot && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowChatbot(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'transparent',
                border: 'none',
                color: '#FFD700',
                fontSize: 22,
                cursor: 'pointer',
                zIndex: 1100,
              }}
              aria-label="Close Chatbot"
            >
              ×
            </button>
            <Chatbot />
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingActions; 