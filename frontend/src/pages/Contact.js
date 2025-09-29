import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [showModal]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const officeLocations = [
    {
      city: 'Nashik',
      address: 'P. No. 14, Sneh Prasad, Vighnaharta Colony, Khutwad Nagar, Nashik - 08',
      phone: '+91 70305 02111',
      email: 'ganeshyeolebuilders@gmail.com',
      hours: 'Mon - Sat: 9:00 AM - 7:00 PM'
    },
    {
      city: 'Pune',
      address: 'Shop No. 12, Commercial Complex, Hinjewadi, Pune 411057',
      phone: '+91 70305 02111',
      email: 'ganeshyeolebuilders@gmail.com',
      hours: 'Mon - Sat: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <section className="min-h-screen pb-12 bg-white dark:bg-black text-[#181818] dark:text-white transition-colors duration-300">
      <Helmet>
        <title>Contact Us - Ganesh Yeole Builders | Get in Touch</title>
        <meta name="description" content="Contact Ganesh Yeole Builders and Developers. Visit our offices in Nashik, Mumbai, and Pune or reach us via phone, email, or contact form." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 pt-8 sm:pt-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E53935] mb-6 sm:mb-8">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-4 leading-relaxed">
            Ready to find your dream home? Contact us today and let our experts guide you through your real estate journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E53935] mb-3">Send us a Message</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="property-inquiry">Property Inquiry</option>
                    <option value="site-visit">Site Visit Request</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#E53935] to-red-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 lg:space-y-10">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E53935] mb-4 sm:mb-6">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6 lg:mb-8">Get in touch with us through any of these channels</p>
              <div className="space-y-6 lg:space-y-8">
                <div className="flex items-center lg:items-start gap-4 lg:gap-6">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-medium">+91 70305 02111</p>
                  </div>
                </div>
                <div className="flex items-center lg:items-start gap-4 lg:gap-6">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base break-all">ganeshyeolebuilders@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center lg:items-start gap-4 lg:gap-6">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">WhatsApp</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-medium">+91 70305 02111</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quick responses for urgent inquiries</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">Follow Us</h3>
              <div className="flex justify-center lg:justify-start gap-4 sm:gap-6">
                <button className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-lg" aria-label="Facebook">
                  <FaFacebook className="text-white text-lg sm:text-xl" />
                </button>
                <button className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-all duration-200 hover:scale-110 shadow-lg" aria-label="Instagram">
                  <FaInstagram className="text-white text-lg sm:text-xl" />
                </button>
                <button className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-200 hover:scale-110 shadow-lg" aria-label="LinkedIn">
                  <FaLinkedin className="text-white text-lg sm:text-xl" />
                </button>
                <button className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-all duration-200 hover:scale-110 shadow-lg" aria-label="WhatsApp">
                  <FaWhatsapp className="text-white text-lg sm:text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E53935] mb-4 sm:mb-6">Our Office Locations</h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">Visit our offices across different cities to discuss your real estate needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FaMapMarkerAlt className="text-white text-2xl sm:text-3xl" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#E53935]">{office.city}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-gold mt-1 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-gold flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">{office.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-gold flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{office.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-gold flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{office.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#E53935] to-red-600 text-white p-8 sm:p-12 rounded-2xl shadow-xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Your Journey?</h3>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
              Schedule a site visit or consultation with our experts today
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setShowModal(true)}
                className="bg-white text-[#E53935] px-8 py-4 sm:px-12 sm:py-5 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg text-base sm:text-lg"
              >
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#E53935]">Schedule Site Visit</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <ContactForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact; 