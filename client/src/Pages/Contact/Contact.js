import React, { useState } from 'react';
import styles from './Contact.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Contact() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mở/đóng bảng thông tin
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Nút Contact Us */}
      <button className={cx('contact-button')} onClick={togglePanel}>
        Contact Us
      </button>

      {/* Bảng thông tin liên hệ */}
      {isOpen && (
        <div className={cx('contact-panel')}>
          <button className={cx('close-btn')} onClick={togglePanel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2>CONTACT US</h2>
          <div className={cx('contact-item')}>
            <FontAwesomeIcon icon={faPhone} />
            <span>+1 877-482-2430</span>
          </div>
          <div className={cx('contact-item')}>
            <FontAwesomeIcon icon={faEnvelope} />
            <span>support@example.com</span>
          </div>
          <div className={cx('contact-item')}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>123 Main Street, City, Country</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
