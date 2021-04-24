import React from 'react';

import styles from '../css/User.module.css';

import avatar from '../../assets/img/avatar.png';

const User = ({ user }) => {
  return (
    <div className={styles.User}>
      {user && (
        <>
          <div
            className='App-avatar-mini'
            style={{ background: `url(${user.imageAvatar || avatar})` }}
          ></div>
          <p>{user.name}</p>
        </>
      )}
    </div>
  );
};

export default User;
