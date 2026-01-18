import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FaGift, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';
import SpinWheelModal from '../components/SpinWheelModal';
import { prizes } from '../utils/spinWheelUtils';

const Events = () => {
  const titleAnimation = useScrollAnimation('fadeInUp', 0, 0.8);
  const contentAnimation = useScrollAnimation('fadeInUp', 0.2, 0.8);
  const [showSpinModal, setShowSpinModal] = useState(false);

  return (
    <section className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-black text-[#181818] dark:text-white transition-colors duration-300">
      <Helmet>
        <title>Offers and Events - Ganesh Yeole Builders | Spin & Win Prizes</title>
        <meta name="description" content="Spin & Win exciting prizes! Book your flat between Jan 23-26, 2026 and win Refrigerator, Smart TV, Washing Machine, Phone, or Kitchen Appliances." />
      </Helmet>

      <SpinWheelModal isOpen={showSpinModal} onClose={() => setShowSpinModal(false)} />

      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <motion.div {...titleAnimation} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-700 dark:text-amber-500 mb-6">
            🎁 Offers and Events 🎁
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Book your dream flat and win exciting prizes!
          </p>
        </motion.div>

        {/* Active Campaign */}
        <motion.div {...contentAnimation} className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-amber-100 via-amber-50 to-white dark:from-amber-950/50 dark:via-amber-900/30 dark:to-gray-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-500">
            {/* Campaign Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                  <FaGift className="text-5xl text-white animate-bounce" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-3">
                  Spin & Win Campaign
                </h2>
                <div className="flex items-center justify-center gap-2 text-amber-100 text-lg mb-2">
                  <FaCalendarAlt />
                  <span className="font-semibold">January 23-26, 2026</span>
                </div>
                <p className="text-amber-50 text-xl font-medium">
                  Book Your Flat & Claim Exciting Prizes!
                </p>
              </div>
            </div>

            {/* Campaign Content */}
            <div className="p-8 md:p-12">
              {/* How it Works */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-500 mb-6 text-center">
                  How It Works
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Click Spin Button</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Click the floating "Spin & Win" button or the button below
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Spin the Wheel</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Watch the wheel spin and see what prize you win!
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Claim Your Prize</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Fill the form, book a flat, and get your prize!
                    </p>
                  </div>
                </div>
              </div>

              {/* Prizes */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-500 mb-6 text-center">
                  Exciting Prizes to Win!
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {prizes.map((prize) => (
                    <div
                      key={prize.id}
                      className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-amber-500"
                      style={{ borderColor: prize.color + '40' }}
                    >
                      <div className="text-5xl mb-3">{prize.emoji}</div>
                      <p className="font-semibold text-sm text-gray-800 dark:text-white">
                        {prize.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center mb-8">
                <button
                  onClick={() => setShowSpinModal(true)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 animate-pulse"
                >
                  <FaGift className="text-2xl" />
                  Spin Now & Win!
                </button>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                  <FaCheckCircle className="text-amber-600" />
                  Terms & Conditions
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Campaign valid from January 23-26, 2026</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>One spin per person/device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Prize must be claimed within 30 days from winning date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span><strong>Flat booking is mandatory to claim the prize</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Prize subject to availability and verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Verification required at site visit with claim code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Company reserves the right to modify or cancel the offer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Employees and their immediate family members are not eligible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto"
        >
          <FaClock className="text-4xl text-amber-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-500 mb-3">
            Limited Time Offer!
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Don't miss this opportunity! Spin the wheel and win amazing prizes when you book your dream flat.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            For more information, please{' '}
            <a href="/contact" className="text-amber-600 dark:text-amber-500 font-semibold hover:underline">
              contact our sales team
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;