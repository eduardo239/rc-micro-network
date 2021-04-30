import React from 'react';

import { Link } from 'react-router-dom';
import { dateFormat } from '../../helper/dateFormat';

import styles from '../css/User.module.css';
import avatar from '../../assets/img/avatar.png';

const User = ({ user }) => {
  return (
    <div className={styles.popover}>
      <div className={styles.User}>
        {user && (
          <>
            <div
              className='App-avatar-mini'
              style={{ background: `url(${user.imageAvatar || avatar})` }}
            ></div>
            <Link to={`profile/${user._id}`}>{user.name}</Link>
            <div className={styles.popoverContent}>
              <p>{`User since: ${dateFormat(user.createdAt)}`}</p>
              <p>Friends: {user.friends.length}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
