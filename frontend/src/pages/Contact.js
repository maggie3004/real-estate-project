import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      address: 'Sai Prasad House, 123 Main Road, Nashik, Maharashtra 422001',
      phone: '+91 98765 43210',
      email: 'nashik@ganeshyoelebuilders.com',
      hours: 'Mon - Sat: 9:00 AM - 7:00 PM'
    },
    {
      city: 'Mumbai',
      address: 'Office No. 45, Building A, Andheri West, Mumbai 400058',
      phone: '+91 98765 43211',
      email: 'mumbai@ganeshyoelebuilders.com',
      hours: 'Mon - Sat: 9:00 AM - 6:00 PM'
    },
    {
      city: 'Pune',
      address: 'Shop No. 12, Commercial Complex, Hinjewadi, Pune 411057',
      phone: '+91 98765 43212',
      email: 'pune@ganeshyoelebuilders.com',
      hours: 'Mon - Sat: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <section className="min-h-screen pt-24 pb-12 bg-white dark:bg-[#181818] text-[#181818] dark:text-white transition-colors duration-300">
      <Helmet>
        <title>Contact Us - Ganesh Yeole Builders | Get in Touch</title>
        <meta name="description" content="Contact Ganesh Yeole Builders and Developers. Visit our offices in Nashik, Mumbai, and Pune or reach us via phone, email, or contact form." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to find your dream home? Contact us today and let our experts guide you through your real estate journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-black mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
              <div className="grid md:grid-cols-2 gap-6">
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
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                    <p className="text-gray-600 dark:text-gray-300">+91 98765 43211</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">info@ganeshyoelebuilders.com</p>
                    <p className="text-gray-600 dark:text-gray-300">sales@ganeshyoelebuilders.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">WhatsApp</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quick responses for urgent inquiries</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Follow Us</h3>
                             <div className="flex gap-4">
                 <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200" aria-label="Facebook">
                   <FaFacebook className="text-white text-xl" />
                 </button>
                 <button className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center hover:bg-gold-700 transition-colors duration-200" aria-label="Instagram">
                   <FaInstagram className="text-white text-xl" />
                 </button>
                 <button className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-800 transition-colors duration-200" aria-label="LinkedIn">
                   <FaLinkedin className="text-white text-xl" />
                 </button>
                 <button className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center hover:bg-gold-700 transition-colors duration-200" aria-label="WhatsApp">
                   <FaWhatsapp className="text-white text-xl" />
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Our Office Locations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaMapMarkerAlt className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">{office.city}</h3>
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
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-lg mb-6 opacity-90">
              Schedule a site visit or consultation with our experts today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200">
                Schedule Site Visit
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors duration-200">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 