import React from 'react';
import styles from './SimpleFloatingCallButton.module.css';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const phoneNumber = '7030502111';
const whatsappNumber = '917030502111';

const SimpleFloatingCallButton = () => (
  <div className={styles.simpleFloatingButtonWrapper} data-testid="simple-floating-call-button-wrapper">
    <a
      href={`tel:${phoneNumber}`}
      className={styles.simpleFloatingButton}
      aria-label="Call now"
      style={{ position: 'relative' }}
    >
      <span className={styles.simpleFloatingButtonLabel}>Call</span>
      <FaPhoneAlt />
    </a>
    <a
      href={`https://wa.me/${whatsappNumber}`}
      className={styles.simpleFloatingButton}
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
      style={{ position: 'relative' }}
    >
      <span className={styles.simpleFloatingButtonLabel}>WhatsApp</span>
      <FaWhatsapp />
    </a>
  </div>
);

export default SimpleFloatingCallButton;
