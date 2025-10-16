import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';

const phoneNumber = '7030502111';
const whatsappNumber = '917030502111'; // Include country code for WhatsApp

const FloatingCallButton = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Portal target - render to body
  const portalTarget = mounted && typeof window !== 'undefined' ? document.body : null;

  if (!mounted || !portalTarget) return null;

  const button = (
    <div className="floating-action-button-wrapper">
      <div className="floating-action-container">
        {/* Main Floating Button at the very bottom */}
        <button
          aria-label="Contact options"
          onClick={() => setOpen((prev) => !prev)}
          className={`floating-main-button ${open ? 'active' : ''}`}
        >
          <div className="floating-button-content">
            {open ? <FaTimes className="floating-main-icon" /> : <FaPhoneAlt className="floating-main-icon" />}
          </div>
          {!open && <span className="floating-pulse-ring"></span>}
          {!open && <span className="floating-pulse-ring-2"></span>}
        </button>
        {/* Options - appear perfectly vertically above the main button */}
        <div className={`floating-action-options ${open ? 'active' : ''}`}>
          <div className="floating-option-item">
            <a
              href={`tel:${phoneNumber}`}
              aria-label="Call now"
              className="floating-option-button call-btn"
            >
              <FaPhoneAlt className="floating-option-icon" />
            </a>
          </div>
          <div className="floating-option-item">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="floating-option-button whatsapp-btn"
            >
              <FaWhatsapp className="floating-option-icon" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .floating-action-button-wrapper {
          position: fixed !important;
          bottom: 12px !important;
          right: 12px !important;
          z-index: 2147483647 !important;
          isolation: isolate;
          pointer-events: none;
        }

        .floating-action-container {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          pointer-events: auto;
        }

        /* Main button */
        .floating-main-button {
          position: relative;
          background: #fff;
          color: #e53935;
          border: 2px solid #e53935;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          outline: none;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-main-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .floating-main-button.active {
          background: #e53935;
          color: #fff;
          border-color: #e53935;
          transform: rotate(90deg);
        }

        .floating-button-content {
          position: relative;
          z-index: 2;
        }

        .floating-main-icon {
          font-size: 1.25rem;
          transition: all 0.3s ease;
        }

        /* Pulse animation */
        .floating-pulse-ring,
        .floating-pulse-ring-2 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border: 2px solid #e53935;
          border-radius: 50%;
          opacity: 0;
          animation: pulse-animation 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        .floating-pulse-ring-2 {
          animation-delay: 1s;
        }

        @keyframes pulse-animation {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }

        /* Options container - positioned ABOVE main button */
        .floating-action-options {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          pointer-events: none;
          transform: translateY(10px) scale(0.8);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          margin-bottom: 8px;
        }

        .floating-action-options.active {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0) scale(1);
        }

        .floating-option-item {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .floating-option-button {
          background: #fff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10);
          border: 2px solid transparent;
        }

        .floating-option-button:hover {
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .floating-option-icon {
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }

        /* WhatsApp button */
        .whatsapp-btn {
          border-color: #25d366;
        }

        .whatsapp-btn .floating-option-icon {
          color: #25d366;
        }

        .whatsapp-btn:hover {
          background: #25d366;
          border-color: #25d366;
        }

        .whatsapp-btn:hover .floating-option-icon {
          color: #fff;
        }

        /* Call button */
        .call-btn {
          border-color: #1976d2;
        }

        .call-btn .floating-option-icon {
          color: #1976d2;
        }

        .call-btn:hover {
          background: #1976d2;
          border-color: #1976d2;
        }

        .call-btn:hover .floating-option-icon {
          color: #fff;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .floating-action-button-wrapper {
            bottom: 16px;
            right: 16px;
          }

          .floating-main-button {
            width: 44px;
            height: 44px;
          }

          .floating-main-icon {
            font-size: 1.15rem;
          }

          .floating-option-button {
            width: 40px;
            height: 40px;
          }

          .floating-option-icon {
            font-size: 1.15rem;
          }

          .floating-option-label {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .floating-action-button-wrapper {
            bottom: 12px;
            right: 12px;
          }

          .floating-main-button {
            width: 42px;
            height: 42px;
          }

          .floating-main-icon {
            font-size: 1.1rem;
          }

          .floating-option-button {
            width: 38px;
            height: 38px;
          }

          .floating-option-icon {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );

  return createPortal(button, portalTarget);
};

export default FloatingCallButton;
