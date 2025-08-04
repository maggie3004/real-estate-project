import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiDownload, FiMessageSquare, FiHelpCircle, FiMoreVertical, FiX } from 'react-icons/fi';

const FloatingActions = ({ brochurePath, projectName }) => {
  const [open, setOpen] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(brochurePath);
      if (!response.ok) throw new Error('Brochure not found');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName} Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading brochure:', error);
      alert('Sorry, the brochure is currently unavailable.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Main buttons */}
        <div className="flex flex-col gap-2">
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          >
            <FaWhatsapp className="text-white" size={24} />
          </a>
          
          <a 
            href="tel:+911234567890" 
            className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <FiPhone className="text-white" size={24} />
          </a>

          <button 
            onClick={handleDownload}
            className="bg-purple-500 p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors"
            disabled={!brochurePath}
          >
            <FiDownload className="text-white" size={24} />
          </button>

          {/* Add other buttons as needed */}
        </div>
      </div>
    </div>
  );
};

export default FloatingActions;
