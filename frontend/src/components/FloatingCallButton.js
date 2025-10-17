import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaPhoneAlt, FaWhatsapp, FaTimes } from 'react-icons/fa';
import styles from './FloatingCallButton.module.css';

const phoneNumber = '7030502111';
const whatsappNumber = '917030502111';

const FloatingCallButton = () => {
  const [open, setOpen] = useState(false);

  const content = (
    <div
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
