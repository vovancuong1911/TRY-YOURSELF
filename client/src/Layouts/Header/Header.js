import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Logo from './img/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/userStore/actions';

const cx = classNames.bind(styles);

function Header() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showContactNotification, setShowContactNotification] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Tự động ẩn thông báo sau 3 giây
  useEffect(() => {
    let timer;
    if (showContactNotification) {
      timer = setTimeout(() => {
        setShowContactNotification(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [showContactNotification]);

  const showContactNotificationHandler = () => {
    setShowContactNotification(true);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <>
      {/* Header Wrapper */}
      <div className={cx('wrapper')}>
        {/* Logo */}
        <Link to="/" className={cx('logo')}>
          <img src={Logo} alt="Logo" />
        </Link>

        {/* Search Bar */}
        <div className={cx('search-container')}>
          <input
            type="text"
            placeholder="Tool AI bạn quan tâm"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Menu */}
        <div className={cx('menu')}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/admin/blog-management">Admin</Link></li>
            <li>
              <button className={cx('contact-btn')} onClick={showContactNotificationHandler}>
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className={cx('auth-buttons')}>
          {userState?.isAuthenticated ? (
            <>
              <Link to="/info" className={cx('login-button')}>
                <FontAwesomeIcon icon={faUser} />
                <span> Info</span>
              </Link>
              <button onClick={handleLogout} className={cx('register-button')}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={cx('login-button')}>Login</Link>
              <Link to="/register" className={cx('register-button')}>Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Contact Notification */}
      {showContactNotification && (
        <div className={cx('notification')}>
          <FontAwesomeIcon icon={faInfoCircle} className={cx('icon')} />
          <div>
            <strong>Contact Us</strong>
            <p>Email: vovancuongzenovovancuongzeno@gmail.com</p>
            <p>Phone: +84 399-252-799</p>
            <p>Zalo : 0399252799</p>
            <p>Facebook : vocuong19.11</p>
            <p>mọi thắc mắc sẽ được bên shop phản hồi nhanh nhất.</p>
          </div>
          <button className={cx('close-btn')} onClick={() => setShowContactNotification(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
