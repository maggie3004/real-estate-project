import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Confetti from 'react-confetti';
import SpinWheel from './SpinWheel';
import PrizeClaimForm from './PrizeClaimForm';
import { getPrizeFromAngle, hasUserSpun, markUserAsSpun, getWinningData, generateClaimCode, saveWinningData } from '../utils/spinWheelUtils';

const SpinWheelModal = ({ isOpen, onClose }) => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [wonPrize, setWonPrize] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showClaimForm, setShowClaimForm] = useState(false);
    const [hasSpunBefore, setHasSpunBefore] = useState(false);

    useEffect(() => {
        const alreadySpun = hasUserSpun();
        setHasSpunBefore(alreadySpun);

        if (alreadySpun && !wonPrize) {
            const savedData = getWinningData();
            if (savedData && savedData.prizeName) {
                setWonPrize({
                    name: savedData.prizeName,
                    emoji: savedData.prizeEmoji
                });
            }
        }
    }, [isOpen, wonPrize]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen]);

    const handleSpin = () => {
        if (isSpinning || hasSpunBefore) return;

        setIsSpinning(true);

        // Random degree between 0-360
        const randomDegree = Math.floor(Math.random() * 360);
        // Add 4 full rotations (1440 degrees) for effect
        const fullRotations = 1440;
        const finalRotation = rotation + fullRotations + randomDegree;

        setRotation(finalRotation);

        // After spin completes (5 seconds)
        setTimeout(() => {
            setIsSpinning(false);
            const prize = getPrizeFromAngle(finalRotation);
            setWonPrize(prize);
            setShowConfetti(true);

            // Save participation data
            const claimCode = generateClaimCode();
            saveWinningData(prize, claimCode);
            markUserAsSpun();

            setHasSpunBefore(true);

            // Stop confetti after 5 seconds
            setTimeout(() => {
                setShowConfetti(false);
                setShowClaimForm(true);
            }, 5000);
        }, 5000);
    };

    const handleClaimSubmit = (formData) => {
        console.log('Prize claim submitted:', formData);
    };

    const handleClose = () => {
        if (!isSpinning) {
            onClose();
        }
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
                    onClick={handleClose}
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

                {/* Confetti */}
                {showConfetti && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000000, pointerEvents: 'none' }}>
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                            numberOfPieces={200}
                            recycle={false}
                            colors={['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#D97706', '#F59E0B']}
                        />
                    </div>
                )}

                {/* Modal Main Body */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full border-4 border-amber-500 relative flex flex-col"
                    style={{
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflow: 'hidden'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    {!isSpinning && (
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors shadow-sm"
                            aria-label="Close"
                        >
                            <FaTimes className="text-gray-600 dark:text-gray-300" />
                        </button>
                    )}

                    {/* Scrollable container for modal contents ONLY if they overflow the restricted height */}
                    <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
                        {!showClaimForm ? (
                            <>
                                {/* Header */}
                                <div className="text-center mb-4">
                                    <motion.h2
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-2xl md:text-3xl font-black text-amber-700 dark:text-amber-500 mb-0.5"
                                    >
                                        🎁 Spin & Win! 🎁
                                    </motion.h2>
                                    <motion.p
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium"
                                    >
                                        Book Your Flat & Claim Exciting Prizes!
                                    </motion.p>
                                    <div className="mt-1.5 text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-900/20 inline-block px-3 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                                        📅 Valid: January 23-26, 2026
                                    </div>
                                </div>

                                {/* Spin Wheel */}
                                <div className="mb-4 flex justify-center">
                                    <div style={{ maxWidth: '300px', width: '100%' }}>
                                        <SpinWheel rotation={rotation} isSpinning={isSpinning} />
                                    </div>
                                </div>

                                {/* Spin Button */}
                                {!wonPrize && (
                                    <div className="text-center">
                                        <motion.button
                                            whileHover={{ scale: hasSpunBefore ? 1 : 1.05 }}
                                            whileTap={{ scale: hasSpunBefore ? 1 : 0.95 }}
                                            onClick={handleSpin}
                                            disabled={isSpinning || hasSpunBefore}
                                            className={`px-10 py-3 rounded-2xl font-black text-xl shadow-2xl transition-all duration-300 ${hasSpunBefore
                                                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                                                : isSpinning
                                                    ? 'bg-amber-400 cursor-wait text-white'
                                                    : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-amber-600/30'
                                                }`}
                                        >
                                            {hasSpunBefore
                                                ? '✓ Already Claimed'
                                                : isSpinning
                                                    ? 'Spinning...'
                                                    : 'SPIN NOW!'}
                                        </motion.button>
                                        {hasSpunBefore && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 font-medium uppercase tracking-wider">
                                                You've already Claimed your prize
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Prize Announcement */}
                                {wonPrize && !showClaimForm && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-950/30 p-8 rounded-3xl border-2 border-amber-200 dark:border-amber-800 shadow-inner"
                                    >
                                        <p className="text-6xl mb-4">{wonPrize.emoji}</p>
                                        <h3 className="text-3xl font-black text-amber-700 dark:text-amber-500 mb-2 uppercase">
                                            Congratulations!
                                        </h3>
                                        <p className="text-2xl text-gray-800 dark:text-gray-200">
                                            You won: <span className="font-black text-amber-600">{wonPrize.name}</span>
                                        </p>
                                    </motion.div>
                                )}

                                {/* Terms */}
                                <div className="mt-4 text-center">
                                    <p className="text-[9px] text-gray-500 dark:text-gray-500 font-medium leading-relaxed">
                                        * Prize valid only on flat booking. One spin per person. All decisions of Ganesh Yeole Builders & Developers are final and binding.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <PrizeClaimForm
                                prize={wonPrize}
                                onClose={handleClose}
                                onSubmit={handleClaimSubmit}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default SpinWheelModal;
