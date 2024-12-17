import classNames from 'classnames/bind';
import styles from './Blogger.module.scss';

import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import Banner from '../Layouts/Banner/Banner';
import SlideProducts from '../../Layouts/Main/SlideProducts/SlideProducts';
import { useEffect, useState } from 'react';
import api from '../../config/Connect';
import { getAllBlog } from '../../services/blog.service';

const cx = classNames.bind(styles);

function BlogList() {
  const [dataBlog, setDataBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBlog();
        setDataBlog(response);
      } catch (error) {
        console.log({ error });
      }
    };

    fetchData();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <header>
        <Header />
      </header>

      <div>
        <Banner />
      </div>

      <main className={cx('inner')}>
        <div>
          <SlideProducts productDescriptions={dataBlog} />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default BlogList;
