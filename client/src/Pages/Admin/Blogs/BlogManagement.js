// src/Pages/Admin/Layouts/HomePageAdmin/Blog/BlogManagement.js

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import ModalAddBlog from '../Modal/ModalAddBlog';
import ModalEditBlog from '../Modal/ModalEditBlog';
import { deleteBlog, getAllBlog } from '../../../services/blog.service';

const cx = classNames.bind(styles);

function BlogManagement() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataBlog, setDataBlog] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleShowAdd = () => {
    setShowAdd(!showAdd);
  };

  const handleShowEdit = (id) => {
    setSelectedBlogId(id);
    setShowEdit(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBlog();
      setDataBlog(res);
    };
    fetchData();
  }, [showAdd, showEdit]);

  const handleDeleteBlog = async (id) => {
    const res = await deleteBlog(id);
    const resData = await getAllBlog();
    setDataBlog(resData);
    toast.success(res.message);
  };

  return (
    <>
      <div className={cx('btn-addBlog')}>
        <button onClick={handleShowAdd} type="button" className="btn btn-primary">
          Add Blog
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Img</th>
            <th scope="col">Name Blog</th>
            <th scope="col">Description</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {dataBlog.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>
                <img style={{ width: '150px' }} src={item.img} alt="" />
              </td>
              <td>{item.title}</td>
              <td>{item.des}</td>
              <td>
                <button
                  onClick={() => handleDeleteBlog(item._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleShowEdit(item._id)}
                  type="button"
                  className="btn btn-warning"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
      <ModalAddBlog show={showAdd} setShow={setShowAdd} />
      <ModalEditBlog show={showEdit} setShow={setShowEdit} blogId={selectedBlogId} />
    </>
  );
}

export default BlogManagement;