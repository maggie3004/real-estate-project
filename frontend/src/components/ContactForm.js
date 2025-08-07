import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCommentDots, 
  FaUpload, FaCheck, FaTimes, FaArrowRight,
  FaArrowLeft, FaBuilding, FaHome, FaSearch
} from 'react-icons/fa';

const ContactForm = ({ propertyId = null, propertyTitle = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
    enquiryType: 'general',
    preferredTime: 'anytime',
    budget: '',
    propertyType: 'any',
    timeline: 'flexible'
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [attachments, setAttachments] = useState([]);

  const totalSteps = 3;

  const enquiryTypes = [
    { value: 'general', label: 'General Enquiry', icon: FaCommentDots },
    { value: 'property', label: 'Property Viewing', icon: FaHome },
    { value: 'investment', label: 'Investment Advice', icon: FaBuilding },
    { value: 'valuation', label: 'Property Valuation', icon: FaSearch }
  ];

  const preferredTimes = [
    { value: 'anytime', label: 'Anytime' },
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
    { value: 'evening', label: 'Evening (5 PM - 8 PM)' }
  ];

  const propertyTypes = [
    { value: 'any', label: 'Any Type' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const timelines = [
    { value: 'flexible', label: 'Flexible' },
    { value: '1month', label: 'Within 1 Month' },
    { value: '3months', label: 'Within 3 Months' },
    { value: '6months', label: 'Within 6 Months' },
    { value: '1year', label: 'Within 1 Year' }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits';
    }
    
    if (step === 2) {
      if (!formData.location.trim()) newErrors.location = 'Location is required';
      if (!formData.enquiryType) newErrors.enquiryType = 'Please select enquiry type';
    }
    
    if (step === 3) {
      if (!formData.message.trim()) newErrors.message = 'Message is required';
      if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      file.size <= 5 * 1024 * 1024 && // 5MB limit
      ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'].includes(file.type)
    );
    
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(1);
      setFormData({
        name: '', email: '', phone: '', location: '', message: '',
        enquiryType: 'general', preferredTime: 'anytime', budget: '',
        propertyType: 'any', timeline: 'flexible'
      });
      setAttachments([]);
    }, 3000);
  };

  const getStepProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          Your enquiry has been submitted successfully. We'll get back to you within 24 hours.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Reference ID:</strong> ENQ-{Date.now().toString().slice(-6)}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
        <p className="text-gray-600">
          {propertyTitle 
            ? `Enquire about ${propertyTitle}`
            : 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
          }
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(getStepProgress())}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-amber-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getStepProgress()}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
          </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="w-4 h-4 inline mr-2 text-amber-500" />
                    Full Name *
                  </label>
            <input
              type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaTimes className="w-3 h-3 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="w-4 h-4 inline mr-2 text-amber-500" />
                    Email Address *
                  </label>
            <input
              type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaTimes className="w-3 h-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaPhone className="w-4 h-4 inline mr-2 text-amber-500" />
                    Phone Number *
                  </label>
            <input
              type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaTimes className="w-3 h-3 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="w-4 h-4 inline mr-2 text-amber-500" />
                    Your Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your city/location"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FaTimes className="w-3 h-3 mr-1" />
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Enquiry Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type of Enquiry *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {enquiryTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <label
                        key={type.value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.enquiryType === type.value
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="enquiryType"
                          value={type.value}
                          checked={formData.enquiryType === type.value}
                          onChange={(e) => handleInputChange('enquiryType', e.target.value)}
                          className="sr-only"
                        />
                        <Icon className="w-5 h-5 mr-3 text-amber-500" />
                        <span className="font-medium">{type.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {preferredTimes.map((time) => (
                      <option key={time.value} value={time.value}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., ₹50L - ₹1Cr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type Interest
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {timelines.map((timeline) => (
                      <option key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Message & Attachments */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCommentDots className="w-4 h-4 inline mr-2 text-amber-500" />
                  Your Message *
                </label>
            <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us more about your requirements..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FaTimes className="w-3 h-3 mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUpload className="w-4 h-4 inline mr-2 text-amber-500" />
                  Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,.pdf"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      Click to upload files or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF, PDF up to 5MB each
                    </p>
                  </label>
                </div>
                
                {attachments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
            <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={currentStep !== 1 ? { scale: 1.02 } : {}}
            whileTap={currentStep !== 1 ? { scale: 0.98 } : {}}
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </motion.button>

          {currentStep < totalSteps ? (
            <motion.button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Next
              <FaArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
              Send Message
                  <FaArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </motion.button>
          )}
        </div>
          </form>
      </div>
  );
};

export default ContactForm; 