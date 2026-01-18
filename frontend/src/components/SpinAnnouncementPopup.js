import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGift } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { prizes } from '../utils/spinWheelUtils';

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

                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-center relative">
                        <div className="absolute inset-0 bg-white/10 opacity-20 transform -skew-y-6"></div>
                        <div className="relative z-10">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3 backdrop-blur-sm border border-white/30 shadow-xl"
                            >
                                <FaGift className="text-3xl text-white" />
                            </motion.div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1 tracking-tight">
                                🎉 Spin & Win! 🎉
                            </h2>
                            <div className="h-0.5 w-16 bg-white/40 mx-auto rounded-full mb-2"></div>
                            <p className="text-amber-50 text-base font-medium opacity-90">
                                Book Your Flat & Win Big!
                            </p>
                        </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar flex-grow">
                        <div className="text-center">
                            <p className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">
                                Exclusive Offers Await!
                            </p>
                            <p className="text-[11px] text-gray-600 dark:text-gray-400">
                                Don't miss out on amazing prizes when you book your dream home with us.
                            </p>
                        </div>

                        {/* Prizes Row */}
                        <div className="flex justify-center gap-2 pb-1">
                            {prizes.slice(0, 5).map((prize) => (
                                <div
                                    key={prize.id}
                                    className="w-11 h-11 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex flex-col items-center justify-center border-2 border-amber-100 dark:border-amber-800 shadow-sm"
                                >
                                    <span className="text-lg">{prize.emoji}</span>
                                </div>
                            ))}
                        </div>

                        {/* Date Badge */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-amber-800/10 p-2.5 rounded-xl border border-amber-200 dark:border-amber-700 text-center shadow-inner">
                            <p className="text-[9px] font-bold text-amber-800 dark:text-amber-400 mb-0.5 uppercase tracking-widest">
                                Offer Duration
                            </p>
                            <p className="text-lg font-black text-amber-600 dark:text-amber-500">
                                Jan 23 - 26, 2026
                            </p>
                        </div>

                        {/* CTA */}
                        <motion.button
                            whileHover={{ scale: 1.02, translateY: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleViewOffer}
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white p-3.5 rounded-xl font-black text-base hover:shadow-2xl transition-all shadow-xl shadow-amber-600/20"
                        >
                            SPIN NOW & WIN! 🎁
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
