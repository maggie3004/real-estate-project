import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaGift } from 'react-icons/fa';
import SpinAnnouncementPopup from './SpinAnnouncementPopup';
import { isCampaignActive } from '../utils/spinWheelUtils';

const FloatingSpinButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const campaignActive = isCampaignActive();

  useEffect(() => {
    // Listen for call menu state changes
    const handleMenuToggle = (e) => {
      setIsMenuOpen(e.detail.isOpen);
    };
    window.addEventListener('floatingMenuToggle', handleMenuToggle);
    return () => window.removeEventListener('floatingMenuToggle', handleMenuToggle);
  }, []);

  useEffect(() => {
    // Auto-show popup after 3 seconds on mount (fresh load or refresh)
    if (campaignActive) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [campaignActive]);

  if (!campaignActive) return null;

  const buttonContent = (
    <div
      className="floating-spin-btn-wrapper"
      style={{
        position: 'fixed',
        bottom: isMenuOpen ? '230px' : '88px', // Move up dynamic: 24 (bottom) + 48 (call) + 140 (options) + 18 (gap)
        right: '24px',  // Match call button's right position exactly
        zIndex: 100000,
        pointerEvents: 'auto',
        display: 'inline-block',
        transition: 'bottom 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Floating Button */}
        <button
          onClick={() => setShowModal(true)}
          aria-label="Spin and Win"
          className="floating-spin-btn"
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

        @media (max-width: 768px) {
          .floating-spin-btn-wrapper {
            bottom: ${isMenuOpen ? '200px' : '74px'} !important;
            right: 16px !important;
          }
          .floating-spin-btn {
            width: 44px !important;
            height: 44px !important;
          }
        }

        @media (max-width: 480px) {
          .floating-spin-btn-wrapper {
            bottom: ${isMenuOpen ? '180px' : '66px'} !important;
            right: 12px !important;
          }
          .floating-spin-btn {
             width: 42px !important;
             height: 42px !important;
          }
        }
      `}</style>
      </div>
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
