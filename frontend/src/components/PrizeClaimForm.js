import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGift, FaUser, FaPhone, FaEnvelope, FaBuilding, FaClock } from 'react-icons/fa';
import { generateClaimCode, saveWinningData } from '../utils/spinWheelUtils';

const PrizeClaimForm = ({ prize, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        project: '',
        preferredTime: ''
    });
    const [claimCode, setClaimCode] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const projects = [
        'Shree Ganesh Srushti',
        'Shree Ganesh Park',
        'Shree Ganesh Heights',
        'Not decided yet'
    ];

    const timeSlots = [
        'Morning (10 AM - 12 PM)',
        'Afternoon (12 PM - 4 PM)',
        'Evening (4 PM - 7 PM)',
        'Anytime'
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Invalid phone number';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.project) newErrors.project = 'Please select a project';
        if (!formData.preferredTime) newErrors.preferredTime = 'Please select preferred time';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const code = generateClaimCode();
        setClaimCode(code);
        saveWinningData(prize, code);
        setIsSubmitted(true);

        // Call parent submit handler (for EmailJS later)
        if (onSubmit) {
            onSubmit({ ...formData, prize: prize.name, claimCode: code });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8"
            >
                <div className="mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaGift className="text-4xl text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-amber-700 dark:text-amber-500 mb-2">
                        Congratulations! 🎉
                    </h3>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                        You've won: <span className="font-bold">{prize.emoji} {prize.name}</span>
                    </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Claim Code:</p>
                    <p className="text-2xl font-mono font-bold text-amber-700 dark:text-amber-500 break-all">
                        {claimCode}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Save this code! You'll need it to claim your prize.
                    </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl mb-6">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        📧 A confirmation email has been sent to <strong>{formData.email}</strong>
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        📞 Our team will contact you within 24 hours at <strong>{formData.phone}</strong>
                    </p>
                </div>

                <div className="text-left bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-6">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2">Next Steps:</h4>
                    <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                        <li>Our team will call you to schedule a site visit</li>
                        <li>Visit our project and explore your dream home</li>
                        <li>Successful Flat booking is mandatory to claim your prize</li>
                        <li>Prize must be claimed before 26th Jan, 2026</li>
                    </ol>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg"
                >
                    Close
                </button>
            </motion.div>
        );
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-500 mb-2">
                    Claim Your Prize!
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    You won: <span className="font-bold">{prize.emoji} {prize.name}</span>
                </p>
            </div>

            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaUser className="inline mr-2" />
                    Full Name *
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaPhone className="inline mr-2" />
                    Phone Number *
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="10-digit mobile number"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaEnvelope className="inline mr-2" />
                    Email Address *
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Project */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaBuilding className="inline mr-2" />
                    Interested Project *
                </label>
                <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                >
                    <option value="">Select a project</option>
                    {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                    ))}
                </select>
                {errors.project && <p className="text-red-500 text-xs mt-1">{errors.project}</p>}
            </div>

            {/* Preferred Time */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaClock className="inline mr-2" />
                    Preferred Contact Time *
                </label>
                <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                >
                    <option value="">Select preferred time</option>
                    {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                    ))}
                </select>
                {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
                Claim My Prize! 🎁
            </button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-500">
                * 'Successful' Prize valid only on flat booking. Terms & conditions apply.
            </p>
        </motion.form>
    );
};

export default PrizeClaimForm;
