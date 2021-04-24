import React from 'react';

import styles from '../css/User.module.css';

import avatar from '../../assets/img/avatar.png';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <div className={styles.User}>
      {user && (
        <>
          <div
            className='App-avatar-mini'
            style={{ background: `url(${user.imageAvatar || avatar})` }}
          ></div>
          <Link to={`profile/${user._id}`}>{user.name}</Link>
        </>
      )}
    </div>
  );
};

export default User;
