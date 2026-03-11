import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Helmet>
        <title>Thank You | Ganesh Yeole Builders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-[#111] border border-amber-500/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="bg-amber-500 p-6 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)]">
            <FaCheckCircle className="text-black text-6xl" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider"
        >
          Thank <span className="text-amber-500">You!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10"
        >
          We have received your enquiry. Our specialized real estate consultant will get in touch with you shortly to assist with your requirements.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => navigate('/')}
            className="group flex items-center justify-center gap-3 w-full sm:w-auto mx-auto px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-500 font-bold rounded-2xl transition-all duration-300 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] uppercase tracking-widest text-sm"
          >
            <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            Ganesh Yeole Builders & Developers &copy; {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
