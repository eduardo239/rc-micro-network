import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { remove_friend } from '../../store/user';
import { ReactComponent as ChatIcon } from '../../assets/ico/white/carbon_chat.svg';
import { ReactComponent as DeleteIcon } from '../../assets/ico/white/carbon_delete.svg';

import styles from '../css/FriendsLists.module.css';
import avatar from '../../assets/img/avatar.png';

const FriendsLists = ({ friend, login, pmHandler }) => {
  const dispatch = useDispatch();

  const removeFriendHandler = async (id) => {
    dispatch(remove_friend({ userId: login._id, friendId: id }));
  };

  return (
    <div className={styles.FriendsLists}>
      <div className={styles.User}>
        <Link to={`../profile/${friend?.friendId?._id}`}>
          <div
            className='App-avatar-mini'
            style={{
              background: `url(${friend?.friendId?.imageAvatar || avatar})`,
            }}
          ></div>
          {friend?.friendId?.name || 'User not found'}
        </Link>
      </div>
      {friend.userId._id === login._id && (
        <div className={styles.Buttons}>
          <button
            onClick={() => pmHandler(friend?.friendId || null)}
            className='App-btn-icon-mini'
          >
            <ChatIcon />
          </button>
          <button
            onClick={() => removeFriendHandler(friend?.friendId?._id)}
            className='App-btn-icon-mini'
          >
            <DeleteIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendsLists;
