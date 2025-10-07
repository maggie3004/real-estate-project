import React from 'react';
import { FiDownload } from 'react-icons/fi';

const FloatingActions = ({ brochurePath, projectName }) => {

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

  return null;
};

export default FloatingActions;
