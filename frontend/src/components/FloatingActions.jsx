import React, { useState } from 'react';
import { FaWhatsapp, FaPhone, FaDownload, FaEnvelope, FaComments, FaEllipsisV } from 'react-icons/fa';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { 
      icon: <FaWhatsapp size={20} />, 
      label: 'WhatsApp', 
      color: 'bg-green-500 hover:bg-green-600', 
      href: 'https://wa.me/+919876543210' 
    },
    { 
      icon: <FaPhone size={20} />, 
      label: 'Call', 
      color: 'bg-blue-500 hover:bg-blue-600', 
      href: 'tel:+919876543210'
    },
    { 
      icon: <FaDownload size={20} />, 
      label: 'Download', 
      color: 'bg-purple-500 hover:bg-purple-600', 
      onClick: () => window.open('/Shree Ganesh Park E- Brochure.pdf', '_blank')
    },
    { 
      icon: <FaEnvelope size={20} />, 
      label: 'Enquiry', 
      color: 'bg-red-500 hover:bg-red-600', 
      onClick: () => {
        // You can implement your enquiry form logic here
        console.log('Enquiry clicked');
      }
    },
    { 
      icon: <FaComments size={20} />, 
      label: 'Chatbot', 
      color: 'bg-yellow-500 hover:bg-yellow-600', 
      onClick: () => {
        // You can implement your chatbot toggle logic here
        console.log('Chatbot clicked');
      }
    },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-[1000] flex flex-col-reverse items-end">
      {/* Action Buttons */}
      <div className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-300 ease-in-out transform
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {actions.map((action, index) => (
          action.href ? (
            <a
              key={index}
              href={action.href}
              className={`${action.color} text-white p-4 rounded-full shadow-xl cursor-pointer
                transform transition-all duration-300 hover:scale-110 flex items-center gap-3
                backdrop-blur-sm bg-opacity-90 group`}
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="lg:block hidden whitespace-nowrap pr-2 text-sm font-medium opacity-90 
                group-hover:opacity-100">{action.label}</span>
              {action.icon}
            </a>
          ) : (
            <button
              key={index}
              onClick={action.onClick}
              className={`${action.color} text-white p-4 rounded-full shadow-xl cursor-pointer
                transform transition-all duration-300 hover:scale-110 flex items-center gap-3
                backdrop-blur-sm bg-opacity-90 group`}
            >
              <span className="lg:block hidden whitespace-nowrap pr-2 text-sm font-medium opacity-90
                group-hover:opacity-100">{action.label}</span>
              {action.icon}
            </button>
          )
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-red-600 text-white p-4 rounded-full shadow-2xl cursor-pointer
          transform transition-all duration-300 hover:scale-110 hover:bg-red-700
          ${isOpen ? 'rotate-90' : 'rotate-0'} w-14 h-14 flex items-center justify-center`}
        aria-label="Toggle Actions Menu"
      >
        <FaEllipsisV size={24} />
      </button>
    </div>
  );
};

export default FloatingActions;
