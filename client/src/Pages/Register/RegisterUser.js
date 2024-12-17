import classNames from 'classnames/bind';
import styles from './RegisterUser.module.scss';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../../services/auth.service';

const cx = classNames.bind(styles);

function RegisterUser() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      var pattern = /[A-Z]/;
      const checkEmail = pattern.test(email);

      if (fullname === '' || email === '' || password === '' || confirmPassword === '') {
        toast.error('Vui Lòng Xem Lại Thông Tin !!!');
      } else if (checkEmail === true) {
        toast.error('Email Không Được Viết Hoa !!!');
      } else if (password !== confirmPassword) {
        toast.error('Mật Khẩu Không Trùng Khớp !!!');
      } else {
        const res = await register(fullname, email, password, phone);
        if (res.status == '200') {
          toast.success(res.data.message);
          navigate('/login');
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={cx('wrapper')}>
        <div className={cx('inner')}>
          <div className={cx('header-form-login')}>
            <span>Sign Up</span>
            <p>Create your account to get full access</p>
          </div>
          <div className={cx('input-box')}>
            <div className={cx('form-input')}>
              <label>Full Name</label>
              <input placeholder="Enter Full Name" onChange={(e) => setFullname(e.target.value)} />
            </div>

            <div className={cx('form-input')}>
              <label>Email Address</label>
              <input placeholder="Enter Email Address" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={cx('form-input')}>
              <label>Phone</label>
              <input placeholder="Enter Phone" onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className={cx('form-input')}>
              <label>Password</label>

              <input
                placeholder="Enter Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={cx('form-input')}>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={cx('login-footer')}>
            <p>
              Already have an account?
              <Link id={cx('link')} to="/login">
                Login
              </Link>
              here
            </p>
            <button onClick={handleRegister}>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterUser;
