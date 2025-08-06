import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiDownload, FiMessageSquare, FiMoreVertical, FiX, FiMail } from 'react-icons/fi';

const FloatingActions = () => {
  const [open, setOpen] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  // Handle form submission
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    // You can add your API call here
    console.log('Enquiry data:', data);
    setShowEnquiryModal(false);
    // Show success message
    alert('Thank you for your enquiry. We will get back to you soon!');
  };

  const actions = [
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      bg: 'bg-green-600',
      label: 'WhatsApp',
      onClick: () => {
        const message = encodeURIComponent('Hi, I am interested in your properties.');
        window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
      },
    },
    {
      icon: <FiPhone className="w-5 h-5" />,
      bg: 'bg-blue-600',
      label: 'Call Now',
      onClick: () => {
        const phone = '+919876543210'; // Replace with your actual phone number
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = `tel:${phone}`;
        } else {
          alert(`Please call us at ${phone}`);
        }
      },
    },
    {
      icon: <FiDownload className="w-5 h-5" />,
      bg: 'bg-purple-600',
      label: 'Brochure',
      onClick: () => {
        const brochurePath = '/Shree Ganesh Park E- Brochure.pdf';
        const link = document.createElement('a');
        link.href = brochurePath;
        link.setAttribute('download', 'Shree-Ganesh-Brochure.pdf');
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      bg: 'bg-red-600',
      label: 'Enquire',
      onClick: () => setShowEnquiryModal(true),
    },
    {
      icon: <FiMessageSquare className="w-5 h-5" />,
      bg: 'bg-amber-600',
      label: 'Chat',
      onClick: () => {
        // You can integrate with your chat service here
        window.dispatchEvent(new CustomEvent('toggle-chat'));
      },
    },
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end space-y-3">
        {/* Action Buttons */}
        <div className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-300 ease-in-out transform 
          ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          {actions.map((action, index) => (
            <div
              key={index}
              className={`transform transition-all duration-300`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={action.onClick}
                className={`${action.bg} w-12 h-12 text-white rounded-full shadow-xl 
                  flex items-center justify-center transition-all duration-300 
                  hover:scale-110 hover:shadow-2xl relative group`}
                title={action.label}
              >
                {action.icon}
                <span className="absolute right-full mr-3 px-2 py-1 bg-gray-900 text-white text-sm 
                  rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                  whitespace-nowrap pointer-events-none">
                  {action.label}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-full shadow-2xl
            flex items-center justify-center transition-all duration-300 hover:scale-110
            ${open ? 'rotate-180' : 'rotate-0'}`}
          title="Toggle Menu"
        >
          {open ? <FiX className="w-6 h-6" /> : <FiMoreVertical className="w-6 h-6" />}
        </button>
      </div>

      {/* Modal for Enquire Now */}
      {showEnquiryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Enquire Now</h2>
            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Your Name" 
                  className="w-full p-2 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Your Email" 
                  className="w-full p-2 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                />
              </div>
              <div>
                <textarea 
                  name="message"
                  required
                  placeholder="Your Query" 
                  className="w-full p-2 border rounded h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEnquiryModal(false)}
                  className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
            <button 
              onClick={() => setShowEnquiryModal(false)} 
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-800 text-xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActions;
