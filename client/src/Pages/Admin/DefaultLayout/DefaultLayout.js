import React from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import HeaderAdmin from '../Layouts/HeaderAdmin/HeaderAdmin';
import SlideBar from '../Layouts/SlideBar/SlideBar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      {/* Sidebar */}
      <SlideBar />
      <div className={cx('main')}>
        {/* Header */}
        <HeaderAdmin />
        {/* Content */}
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
