import classNames from 'classnames/bind';
import styles from './SlideProducts.module.scss';
import { useState } from 'react';

import latest1 from './img/01.jpg';
import latest2 from './img/02.jpg';
import latest3 from './img/03.jpg';
import latest4 from './img/04.jpg';
import latest5 from './img/05.jpg';

const cx = classNames.bind(styles);

function SlideProducts(props) {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const { productDescriptions } = props;

  const images = [latest1, latest2, latest3, latest4, latest5];

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Top 5 AI mới nhất ít người biết tới</h2>
      <div className={cx('products-container')}>
        {productDescriptions.map((blog, index) => (
          <div
            key={index}
            className={cx('row-product')}
            onMouseEnter={() => setHoveredProduct(blog.title)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className={cx('content')}>
              <span className={cx('product-name')}>{blog.title}</span>
              <p className={cx('description')}>
                {blog.des}
              </p>
              <button className={cx('learn-more-button')}>
                Tìm hiểu thêm
              </button>
            </div>
            <div className={cx('image-container')}>
              <img id={cx('img-item')} src={images[index]} alt={blog.images} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlideProducts;
