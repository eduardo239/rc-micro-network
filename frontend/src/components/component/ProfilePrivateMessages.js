import React from 'react';

import styles from '../css/ProfilePrivateMessages.module.css';
import { ReactComponent as CloseIcon } from '../../assets/ico/white/carbon_close.svg';
import { Link } from 'react-router-dom';

const ProfilePrivateMessages = ({ login }) => {
  return (
    <div>
      {login?.pm &&
        login.pm.map((m) => (
          <div className={styles.Message} key={m._id}>
            <Link to={`../profile/${m.friendId._id}`}>
              <img
                className='App-avatar-mini'
                src={m.friendId.imageAvatar}
                alt={m.friendId.name}
              />
            </Link>
            <p>{m.content}</p>
            <button
              style={{ position: 'absolute', top: '0', right: '0' }}
              className='App-btn-icon-mini'
            >
              <CloseIcon />
            </button>
          </div>
        ))}
    </div>
  );
};

export default ProfilePrivateMessages;
