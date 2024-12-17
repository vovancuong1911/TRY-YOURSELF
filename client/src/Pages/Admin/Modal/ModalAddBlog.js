import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createBlog } from '../../../services/blog.service';

function ModalAddBlog({ show, setShow }) {
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');

  const handleClose = () => setShow(false);

  const handleAddBlog = async () => {
    try {
      const res = await createBlog(title, des);
      toast.success(res.message);
      setShow(false);
    } catch (error) {
      toast.error('Failed to add blog');
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Add New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              onChange={(e) => setDes(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddBlog}>
            Add Blog
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddBlog;