import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { updateBlog, getBlogById } from '../../../services/blog.service';

function ModalEditBlog({ show, setShow, blogId }) {
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      if (blogId) {
        const blog = await getBlogById(blogId);
        setTitle(blog.title);
        setDes(blog.des);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleClose = () => setShow(false);

  const handleEditBlog = async () => {
    try {
      const res = await updateBlog(blogId, title, des);
      toast.success(res.message);
      setShow(false);
    } catch (error) {
      toast.error('Failed to edit blog');
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={des}
              onChange={(e) => setDes(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditBlog}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditBlog;