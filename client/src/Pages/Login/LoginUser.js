import classNames from 'classnames/bind';
import styles from './LoginUser.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userStore/actions';
import { toast, ToastContainer } from 'react-toastify';
import { login } from '../../services/auth.service';
import { useSelector } from 'react-redux';


const cx = classNames.bind(styles);

function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLoginUser = async () => {
    var pattern = /[A-Z]/;
    const test = pattern.test(email);
    if (email === '' || password === '' || test === true) {
      toast.error('Vui Lòng Xem Lại Thông Tin !!!');
    } else {
      try {
        const res = await login(email, password);
        if (res.status == '200') { navigate('/'); }
        dispatch(loginUser(res.user));
        toast.error(res.message);

      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={cx('wrapper')}>
        <div className={cx('inner')}>
          {/* Phần hình ảnh */}
          <div className={cx('image-container')}></div>

          {/* Phần form đăng nhập */}
          <div className={cx('form-container')}>
            <div className={cx('header-form-login')}>
              <span>Login</span>
              <p>Enter Login details to get access</p>
            </div>

            <div className={cx('input-box')}>
              <div className={cx('form-input')}>
                <label>Username or Email Address</label>
                <input
                  placeholder="Username / Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={cx('form-input')}>
                <label>Password</label>
                <input
                  placeholder="Enter Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className={cx('single-input-fields')}>
                <div>
                  <input type="checkbox" />
                  <label>Keep me logged in</label>
                </div>
                <a href="/#">Forgot Password?</a>
              </div>
            </div>

            <div className={cx('login-footer')}>
              <button onClick={handleLoginUser}>Login</button>
              <p>
                Don’t have an account?{' '}
                <Link to="/register">Sign Up</Link> here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
