import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlogCard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function BlogCard({ blog }) {
  // Xử lý fallback cho dữ liệu thiếu
  const { title = 'Untitled Blog', des = 'No description available', img } = blog;

  // Xử lý ảnh không tồn tại
  const handleImageError = (e) => {
    e.target.src = '/assets/default-image.png'; // Đường dẫn ảnh mặc định khi lỗi
  };

  return (
    <div className={cx('blog-card')}>
      <div className={cx('blog-image-container')}>
        <img
          src={img || '/assets/default-image.png'} // Sử dụng fallback ảnh
          alt={`Ảnh minh họa cho bài viết: ${title}`}
          className={cx('blog-image')}
          onError={handleImageError} // Xử lý lỗi ảnh
        />
      </div>
      <div className={cx('blog-content')}>
        <h3 className={cx('blog-title')}>{title}</h3>
        <p className={cx('blog-description')}>{des}</p>
      </div>
    </div>
  );
}

BlogCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    des: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
};

export default BlogCard;
