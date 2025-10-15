import React from 'react';
import { FiDownload } from 'react-icons/fi';

const FloatingActions = ({ brochurePath, projectName }) => {

  const handleDownload = async () => {
    if (!brochurePath) {
      alert('Brochure not available');
      return;
    }
    try {
      const response = await fetch(brochurePath);
      if (!response.ok) throw new Error('Brochure not found');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName || 'Brochure'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading brochure:', error);
      alert('Sorry, the brochure is currently unavailable.');
    }
  };

  // Render a simple floating download button when a brochurePath is provided
  if (!brochurePath) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleDownload}
        aria-label="Download Brochure"
        className="flex items-center gap-2 bg-gold text-black px-4 py-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none"
      >
        <FiDownload className="w-5 h-5" />
        <span className="hidden sm:inline-block font-semibold">Brochure</span>
      </button>
    </div>
  );
};

export default FloatingActions;
