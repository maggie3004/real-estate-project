import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SpinWheel from './SpinWheel';


const SpinAnnouncementPopup = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen]);

    const handleViewOffer = () => {
        onClose();
        navigate('/events');
    };

    if (!isOpen) return null;

    const modalContent = (
        <AnimatePresence>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 999999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    pointerEvents: 'auto'
                }}
            >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(8px)',
                        zIndex: -1
                    }}
                />

                {/* Popup - Centered in viewport */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md border-4 border-amber-500 relative overflow-hidden"
                    style={{
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-all text-white border border-white/30"
                        aria-label="Close"
                    >
                        <FaTimes />
                    </button>

                    {/* Header - Condensed */}
                    <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-4 text-center relative">
                        <div className="absolute inset-0 bg-white/10 opacity-20 transform -skew-y-6"></div>
                        <div className="relative z-10">
                            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight">
                                🎉 Spin & Win! 🎉
                            </h2>
                            <p className="text-amber-50 text-xs font-medium opacity-90">
                                Book Your Flat & Win Big!
                            </p>
                        </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar flex-grow">
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">
                                Exclusive Offers Await!
                            </p>
                            <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">
                                Don't miss out on amazing prizes when you book your dream home with us.
                            </p>
                        </div>

                        {/* Preview Wheel - Replaced Icons */}
                        <div
                            className="flex flex-col items-center pt-1 pb-4 cursor-pointer"
                            onClick={handleViewOffer}
                        >
                            <div className="relative group w-44 h-44 mb-3">
                                <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-500 group-hover:rotate-12">
                                    <SpinWheel rotation={0} isSpinning={false} />
                                </div>
                            </div>

                            {/* Centered exactly below wheel */}
                            <motion.div
                                animate={{
                                    scale: [0.95, 1.05, 0.95],
                                    y: [0, -5, 0]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="z-10 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white pointer-events-none uppercase tracking-tighter"
                            >
                                Tap to Spin!
                            </motion.div>
                        </div>

                        {/* Date Badge */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-amber-800/10 p-2 rounded-xl border border-amber-200 dark:border-amber-700 text-center shadow-inner">
                            <p className="text-[8px] font-bold text-amber-800 dark:text-amber-400 mb-0.5 uppercase tracking-widest leading-none">
                                Offer Duration
                            </p>
                            <p className="text-base font-black text-amber-600 dark:text-amber-500 leading-none">
                                Jan 23 - 26, 2026
                            </p>
                        </div>

                        {/* CTA */}
                        <motion.button
                            whileHover={{ scale: 1.02, translateY: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleViewOffer}
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white p-3 rounded-xl font-black text-base hover:shadow-2xl transition-all shadow-xl shadow-amber-600/20"
                        >
                            CLAIM YOUR PRIZE 🎁
                        </motion.button>

                        <p className="text-[9px] text-center text-gray-500 dark:text-gray-500 font-medium pb-1">
                            * Valid on confirmed bookings only. Terms applied.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default SpinAnnouncementPopup;
