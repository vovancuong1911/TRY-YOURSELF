import classNames from 'classnames/bind';
import styles from './DashBoard.module.scss';
import { useEffect, useState } from 'react';

import api from '../../../../../config/Connect';

const cx = classNames.bind(styles);

function Dashboard() {
  const [dataUser, serDataUser] = useState({});

  useEffect(() => {
    api.get('/api/auth/me').then((res) => serDataUser(res.data));
  }, []);

  return (
    <div className={cx('wrapper')}>
      <header className={cx('header-page-admin')}>
        <div className={cx('img-admin')}>
          <img
            src="https://i.imgur.com/JFbpJqY.jpeg"// avatar
            alt=""
          />
        </div>

        <div className={cx('info-admin')}>
          <h1>{dataUser?.dataUser?.fullname}</h1>
          <div className={cx('position')}>
            <span>{dataUser?.dataUser?.email}</span>
            <span>{dataUser?.dataUser?.isAdmin ? 'Admin' : 'User'}</span>
          </div>
        </div>
      </header>

      <main className={cx('info-account')}>
        <header>
          <h1>Account</h1>
        </header>

        <div className={cx('input-info')}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Username
            </span>
            <input value={dataUser.dataUser?.fullname} type="text" className="form-control" readOnly />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Email
            </span>
            <input value={dataUser.dataUser?.email} type="text" className="form-control" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              PassWord
            </span>
            <input value={dataUser.dataUser?.password} type="password" className="form-control" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Title
            </span>
            <input
              value={dataUser.dataUser?.isAdmin ? 'Administrator' : ''}
              type="text"
              className="form-control"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
