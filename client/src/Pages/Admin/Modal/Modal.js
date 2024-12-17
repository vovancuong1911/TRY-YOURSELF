import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../../config/Connect';
import { toast, ToastContainer } from 'react-toastify';


const cx = classNames.bind(styles);

export function ModalAddProduct({ show, setShow }) {
  const handleClose = () => setShow(false);

  const [nameProduct, setNameProduct] = useState('');
  const [imgProduct, setImgProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState(Number);
  const [desProduct, setDesProduct] = useState('');

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const handleAddProduct = async () => {
    const checkProduct = check1
      ? 'perfume'
      : '' || check2
        ? 'scentedCandles'
        : '' || check3
          ? 'shoe'
          : '' || check4
            ? 'lipstick'
            : '';
    try {
      const res = await api.post('/api/addproduct', {
        nameProduct,
        imgProduct,
        priceProduct,
        desProduct,
        checkProduct,
      });
      toast.success(res.data.message);
      await api.get('/api/products').then();
    } catch (error) { }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Add Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Name Product
            </span>
            <input type="text" className="form-control" onChange={(e) => setNameProduct(e.target.value)} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Img Product
            </span>
            <input type="text" className="form-control" onChange={(e) => setImgProduct(e.target.value)} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Price Product
            </span>
            <input type="text" className="form-control" onChange={(e) => setPriceProduct(e.target.value)} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Description Product
            </span>
            <input type="text" className="form-control" onChange={(e) => setDesProduct(e.target.value)} />
          </div>

          <div className={cx('option')}>
            <div className={cx('form-checkbox')}>
              <label>Chatbot và Trợ lý ảo</label>
              <input type="checkbox" onChange={(e) => setCheck1(e.target.checked)} />
            </div>

            <div className={cx('form-checkbox')}>
              <label>AI Phân tích dữ liệu</label>
              <input type="checkbox" onChange={(e) => setCheck2(e.target.checked)} />
            </div>

            <div className={cx('form-checkbox')}>
              <label>AI Tạo nội dung</label>
              <input type="checkbox" onChange={(e) => setCheck3(e.target.checked)} />
            </div>

            <div className={cx('form-checkbox')}>
              <label>AI Nhận diện hình ảnh và giọng nói</label>
              <input type="checkbox" onChange={(e) => setCheck3(e.target.checked)} />
            </div>
            <div className={cx('form-checkbox')}>
              <label>AI trong Thương mại điện tử và Tư vấn khách hàng</label>
              <input type="checkbox" onChange={(e) => setCheck3(e.target.checked)} />
            </div>
            <div className={cx('form-checkbox')}>
              <label>AI trong Y tế </label>
              <input type="checkbox" onChange={(e) => setCheck3(e.target.checked)} />
            </div>
            <div className={cx('form-checkbox')}>
              <label>AI Tự động hóa công việc </label>
              <input type="checkbox" onChange={(e) => setCheck3(e.target.checked)} />
            </div>


          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Thêm Sản Phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function ModalDeleteProduct({ showModalDelete, setShowModalDelete, idProduct }) {
  const handleClose = () => setShowModalDelete(false);

  const handleDeleteProduct = async () => {
    try {
      const res = await api.post('/api/deleteproduct', { id: idProduct });
      toast.success(res.data.message);
    } catch (error) { }
  };

  return (
    <div>
      <Modal show={showModalDelete} onHide={handleClose}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Xóa Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn Muốn Xóa Sản Phẩm Có ID : {idProduct}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeleteProduct}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export function ModalEditProduct({ setShowModalEdit, showModalEdit, idProduct }) {
  const handleClose = () => setShowModalEdit(false);
  const [nameProduct, setNameProduct] = useState('');
  const [imgProduct, setImgProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState(Number);
  const [desProduct, setDesProduct] = useState('');

  const handleEditProduct = async () => {
    try {
      const res = await api.post('/api/editproduct', {
        nameProduct,
        imgProduct,
        priceProduct,
        desProduct,
        id: idProduct,
      });
      toast.success(res.data.message);
    } catch (error) { }
  };

  return (
    <div>
      <Modal show={showModalEdit} onHide={handleClose}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Name Product
            </span>
            <input type="text" className="form-control" onChange={(e) => setNameProduct(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Img Product
            </span>
            <input type="text" className="form-control" onChange={(e) => setImgProduct(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Price Product
            </span>
            <input type="text" className="form-control" onChange={(e) => setPriceProduct(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Description Product
            </span>
            <input type="text" className="form-control" onChange={(e) => setDesProduct(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleEditProduct}>
            Lưu Lại
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export function ModalAddBlog({ show, setShow }) {
  const handleClose = () => setShow(false);

  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');

  const handleAddBlog = async () => {
    try {
      const res = await api.post('/api/addblog', { img, title, des });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Thêm Bài Viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Img"
              onChange={(e) => setImg(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name Blog"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              onChange={(e) => setDes(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddBlog}>
            Thêm Bài Viết
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function CheckProduct({ show, setShow, idProduct }) {
  const handleClose = () => setShow(false);

  const handleCheckProduct = async () => {
    try {
      const res = await api.post('/api/checkproduct', { idProduct });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Duyệt Đơn Hàng </Modal.Title>
        </Modal.Header>
        <Modal.Body>Duyệt Đơn Hàng Cho : {idProduct}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCheckProduct}>
            Duyệt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
