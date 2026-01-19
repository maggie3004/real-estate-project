import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { FiDownload as DownloadIcon } from 'react-icons/fi';
import styles from './FloatingCallButton.module.css';

const phoneNumber = '7030502111';
const whatsappNumber = '917030502111';

const FloatingCallButton = ({ brochurePath, projectName, isOngoing }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const location = useLocation();

  const handleDownload = async () => {
    if (!brochurePath) {
      alert('Brochure not available');
      return;
    }
    try {
      const response = await fetch(brochurePath);
      if (!response.ok) throw new Error('Brochure not found');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName || 'Brochure'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading brochure:', error);
      alert('Sorry, the brochure is currently unavailable.');
    }
  };

  // Close menu when page changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Dispatch custom event when menu state changes to sync other floating buttons
  useEffect(() => {
    const event = new CustomEvent('floatingMenuToggle', { detail: { isOpen: open } });
    window.dispatchEvent(event);
  }, [open]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const content = (
    <div
      ref={wrapperRef}
      className={styles.floatingActionButtonWrapper}
      style={{ pointerEvents: 'auto' }}
      data-testid="floating-call-button-wrapper"
    >
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center'
      }}>
        {/* Main Floating Button */}
        <button
          aria-label="Contact options"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className={styles.floatingMainButton + (open ? ` ${styles.floatingMainButtonActive}` : '')}
          data-testid="floating-call-main-button"
        >
          <div className={styles.floatingButtonContent}>
            {open ? <FaTimes className={styles.floatingMainIcon} /> : <FaPhoneAlt className={styles.floatingMainIcon} />}
          </div>
          {!open && <span className={styles.floatingPulseRing}></span>}
          {!open && <span className={styles.floatingPulseRing2}></span>}
        </button>

        {/* Options */}
        <div className={styles.floatingActionOptions + (open ? ` ${styles.floatingActionOptionsActive}` : '')}>
          <div className={styles.floatingOptionItem}>
            <a
              href={"tel:" + phoneNumber}
              aria-label="Call now"
              className={`${styles.floatingOptionButton} ${styles.callBtn}`}
            >
              <FaPhoneAlt className={styles.floatingOptionIcon} />
            </a>
          </div>

          <div className={styles.floatingOptionItem}>
            <a
              href={"https://wa.me/" + whatsappNumber}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className={`${styles.floatingOptionButton} ${styles.whatsappBtn}`}
            >
              <FaWhatsapp className={styles.floatingOptionIcon} />
            </a>
          </div>

          {/* Download Brochure - Only on ongoing projects */}
          {isOngoing && brochurePath && (
            <div className={styles.floatingOptionItem}>
              <button
                onClick={handleDownload}
                aria-label="Download Brochure"
                className={`${styles.floatingOptionButton} ${styles.downloadBtn}`}
                style={{ backgroundColor: '#F59E0B' }}
              >
                <DownloadIcon className={styles.floatingOptionIcon} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render into document.body so fixed positioning isn't clipped by transformed/contained ancestors
  if (typeof document !== 'undefined' && document.body) {
    return createPortal(content, document.body);
  }

  return content;
};

export default FloatingCallButton;
