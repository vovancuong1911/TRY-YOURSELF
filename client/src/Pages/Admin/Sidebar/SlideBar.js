import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';

const cx = classNames.bind(styles);

function SlideBar() {
  const menuItems = [
    { path: '/admin', name: 'Dashboard' }, // Dashboard trang chính
  ];

  return (
    <div className={cx('sidebar')}>
      <h3 className={cx('title')}>Admin Panel</h3>
      <ul className={cx('menu')}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path} className={({ isActive }) => cx('menu-item', { active: isActive })}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SlideBar;
