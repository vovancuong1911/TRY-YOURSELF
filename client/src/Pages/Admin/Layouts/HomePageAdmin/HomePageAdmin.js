import classNames from 'classnames';
import styles from './HomePageAdmin.module.scss';

import Dashboard from './DashBoard/DashBoard';
import Products from './Products/Products';
import OrderProducts from './OrderProducts/OrderProducts';
import Customers from './Customers/Customers';

import { useEffect, useState } from 'react';
import api from '../../../../config/Connect';
import Blogger from './Blog/Blogger';

const cx = classNames.bind(styles);

function HomePage({ activeList }) {
  const [dataProducts, setDataProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [idProduct, setIdProduct] = useState(Number);
  const [valueType, setValueType] = useState('');

  useEffect(() => {
    api.get('/api/products').then((res) => setDataProducts(res.data));
  }, [show, showModalDelete, showModalEdit]);

  const handleShowModalAddProduct = () => {
    setShow(!show);
  };

  const handleShowModalDeleteProduct = (id) => {
    setShowModalDelete(!showModalDelete);
    setIdProduct(id);
  };

  const handleShowModalEditProduct = (id) => {
    setShowModalEdit(!showModalEdit);
    setIdProduct(id);
  };
  return (
    <div className={cx('wrapper')}>
      {activeList === 'dash' ? (
        <div className={cx('dash')}>
          <Dashboard />
        </div>
      ) : (
        <></>
      )}
      {activeList === 'product' ? (
        <div className={cx('products')}>
          <Products
            dataProducts={dataProducts}
            show={show}
            setShow={setShow}
            handleShowModalAddProduct={handleShowModalAddProduct}
            showModalDelete={showModalDelete}
            setShowModalDelete={setShowModalDelete}
            handleShowModalDeleteProduct={handleShowModalDeleteProduct}
            idProduct={idProduct}
            handleShowModalEditProduct={handleShowModalEditProduct}
            showModalEdit={showModalEdit}
            setShowModalEdit={setShowModalEdit}
            setValueType={setValueType}
            valueType={valueType}
          />
        </div>
      ) : (
        <></>
      )}

      {activeList === 'order' ? (
        <div>
          <OrderProducts />
        </div>
      ) : (
        <></>
      )}

      {activeList === 'customer' ? (
        <div>
          <Customers />
        </div>
      ) : (
        <></>
      )}

      {activeList === 'blog' ? (
        <div>
          <Blogger />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomePage;
