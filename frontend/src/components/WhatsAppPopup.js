import React from 'react';

const whatsappNumber = 'YOUR_PHONE_NUMBER'; // Replace with your WhatsApp number
const whatsappLink = `https://wa.me/${whatsappNumber}`;

const style = {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  zIndex: 1000,
  background: '#25D366',
  borderRadius: '50%',
  width: '56px',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  cursor: 'pointer',
};

const WhatsAppPopup = () => (
  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={style} title="Chat on WhatsApp">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path d="M23.5 8.5C21.5 6.5 18.5 6.5 16.5 8.5C14.5 10.5 14.5 13.5 16.5 15.5C18.5 17.5 21.5 17.5 23.5 15.5C25.5 13.5 25.5 10.5 23.5 8.5Z" fill="white" />
    </svg>
  </a>
);

export default WhatsAppPopup; 