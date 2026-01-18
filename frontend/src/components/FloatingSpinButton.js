import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaGift } from 'react-icons/fa';
import SpinAnnouncementPopup from './SpinAnnouncementPopup';
import { hasUserSpun, isCampaignActive } from '../utils/spinWheelUtils';

const FloatingSpinButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const campaignActive = isCampaignActive();
    const userHasSpun = hasUserSpun();

    setIsVisible(campaignActive && !userHasSpun);
  }, []);

  if (!isVisible) return null;

  const buttonContent = (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '88px', // Position to the left of call button (24px + 48px button + 16px gap)
        zIndex: 100000,
        pointerEvents: 'auto'
      }}
    >
      {/* Floating Button */}
      <button
        onClick={() => setShowModal(true)}
        aria-label="Spin and Win"
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          color: '#fff',
          border: '2px solid #D97706',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          outline: 'none',
          boxShadow: '0 4px 16px rgba(217, 119, 6, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(217, 119, 6, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(217, 119, 6, 0.3)';
        }}
      >
        <FaGift style={{ fontSize: '1.25rem', position: 'relative', zIndex: 2 }} />

        {/* Pulsing rings */}
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            border: '2px solid #D97706',
            borderRadius: '50%',
            opacity: 0,
            animation: 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite'
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            border: '2px solid #D97706',
            borderRadius: '50%',
            opacity: 0,
            animation: 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 1s'
          }}
        />
      </button>

      {/* Keyframes for pulse animation */}
      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .floating-spin-btn-wrapper {
            bottom: 16px !important;
            right: 72px !important;
          }
          .floating-spin-btn {
            width: 44px !important;
            height: 44px !important;
          }
        }

        @media (max-width: 480px) {
          .floating-spin-btn-wrapper {
            bottom: 12px !important;
            right: 66px !important;
          }
          .floating-spin-btn {
            width: 42px !important;
            height: 42px !important;
          }
        }
      `}</style>
    </div>
  );

  // Render button and modal separately
  return (
    <>
      {typeof document !== 'undefined' && document.body && createPortal(buttonContent, document.body)}
      <SpinAnnouncementPopup isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default FloatingSpinButton;
