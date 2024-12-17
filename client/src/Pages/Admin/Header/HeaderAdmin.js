import React from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';

const cx = classNames.bind(styles);

function HeaderAdmin() {
  const handleLogout = () => {
    console.log('Logged out!');
    localStorage.removeItem('token'); // Xóa token
    window.location.href = '/login'; // Điều hướng về trang login
  };

  return (
    <header className={cx('header')}>
      <h1 className={cx('title')}>Admin Dashboard</h1>
      <button onClick={handleLogout} className={cx('logout')}>
        Logout
      </button>
    </header>
  );
}

export default HeaderAdmin;
