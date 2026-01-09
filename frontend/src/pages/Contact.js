import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// EmailJS Configuration
// TODO: Replace these with your actual EmailJS credentials after setup
// Get these from: https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_ckhnow4';      // e.g., 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_32zcntw';    // e.g., 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'HSyaXzE9evj9xOfTD';      // e.g., 'abc123XYZ'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    propertyType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email || 'Not provided',
        phone: formData.phone,
        subject: formData.subject,
        property_type: formData.propertyType || 'Not specified',
        message: formData.message,
        submission_date: new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'short'
        })
      };

      // Send email via EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);

      // Show success message
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        propertyType: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);

    } catch (error) {
      console.error('Email sending failed:', error);

      // Show error message
      setSubmitStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again or contact us directly at +91 70305 02111'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const officeLocations = [
    {
      city: 'Nashik',
      address: 'P. No. 14, Sneh Prasad, Vighnaharta Colony, Khutwad Nagar, Nashik - 08',
      phone: '+91 70305 02111',
      email: 'ganeshyeolebuilders@gmail.com',
      hours: 'Mon - Sat: 9:00 AM - 7:00 PM'
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-700 dark:text-amber-600 mb-6 sm:mb-8">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-4 leading-relaxed">
            Ready to find your dream home? Contact us today and let our experts guide you through your real estate journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-16">
          {/* Contact Form */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-700 dark:text-amber-600 mb-3">Send us a Message</h2>
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
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your email (optional)"
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

              {/* Property Type Field */}
              <div>
                <label htmlFor="propertyType" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Property Type
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select property type (optional)</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="Plots">Plots</option>
                  <option value="Shops">Shops</option>
                  <option value="Offices">Offices</option>
                  <option value="Farmhouse Land">Farmhouse Land</option>
                </select>
              </div>

              {/* Message Field */}
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

              {/* Status Message */}
              {submitStatus.message && (
                <div className={`p-4 rounded-lg ${submitStatus.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                  }`}>
                  <p className="text-sm font-medium">{submitStatus.message}</p>
                </div>
              )}

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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-700 dark:text-amber-600 mb-4 sm:mb-6">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6 lg:mb-8">Get in touch with us through any of these channels</p>
              <div className="space-y-6 lg:space-y-8 max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center lg:items-start gap-4 lg:gap-6">
                  <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-medium">+91 70305 02111</p>
                  </div>
                </div>
                <div className="flex items-center lg:items-start gap-4 lg:gap-6">
                  <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base break-all">ganeshyeolebuilders@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center lg:items-start gap-4 lg:gap-6">
                  <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div className="text-left">
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
                <a href="https://www.facebook.com/ganeshyeole_builders" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-lg" aria-label="Facebook">
                  <FaFacebook className="text-white text-lg sm:text-xl" />
                </a>
                <a href="https://www.instagram.com/ganeshyeole_builders" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-all duration-200 hover:scale-110 shadow-lg" aria-label="Instagram">
                  <FaInstagram className="text-white text-lg sm:text-xl" />
                </a>
                <a href="https://www.linkedin.com/company/ganeshyeole_builders" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-200 hover:scale-110 shadow-lg" aria-label="LinkedIn">
                  <FaLinkedin className="text-white text-lg sm:text-xl" />
                </a>
                <a href="https://wa.me/917030502111" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-all duration-200 hover:scale-110 shadow-lg" aria-label="WhatsApp">
                  <FaWhatsapp className="text-white text-lg sm:text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-16 sm:mb-20 bg-white dark:bg-black/50 py-12 sm:py-16 -mx-4 px-4 sm:-mx-12 sm:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-700 dark:text-amber-600 mb-4 sm:mb-6">Our Office Locations</h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">Visit our office to discuss your real estate needs</p>
          </div>
          <div className="flex justify-center">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 max-w-md w-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FaMapMarkerAlt className="text-white text-2xl sm:text-3xl" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-600">{office.city}</h3>
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
      </div>
    </section>
  );
};

export default Contact; 