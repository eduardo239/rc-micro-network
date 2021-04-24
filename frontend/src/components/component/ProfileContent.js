import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { remove_friend } from '../../store/user';

import styles from '../css/ProfileContent.module.css';

import { ReactComponent as DeleteIcon } from '../../assets/ico/white/carbon_delete.svg';
import { ReactComponent as ChatIcon } from '../../assets/ico/white/carbon_chat.svg';

import avatar from '../../assets/img/avatar.png';

const ProfileContent = ({ user, login }) => {
  const dispatch = useDispatch();
  const removeHandler = (friendId, userId) => {
    dispatch(remove_friend({ friendId, userId }));
  };

  return (
    <div>
      <div>
        <h3>posts</h3>
        {user && user.posts.map((p) => <div key={p._id}>{p._id}</div>)}
      </div>
      {/* friends */}
      <div className={styles.FriendsContainer}>
        <div className={styles.Friends}>
          <h3>friends</h3>
          {user &&
            user.friends.map((f) => (
              <div key={f._id} className={styles.List}>
                <div className='flex'>
                  <div
                    className='App-avatar-mini'
                    style={{
                      background: `url(${f.friendId.imageAvatar || avatar})`,
                    }}
                  ></div>
                  <Link to={`../profile/${f.friendId._id}`}>
                    {f.friendId.name}
                  </Link>
                </div>
                <div>
                  <button className='App-btn-icon-mini'>
                    <ChatIcon />
                  </button>

                  {login._id === user._id && (
                    <button
                      onClick={() => removeHandler(f.friendId._id, user._id)}
                      className='App-btn-icon-mini'
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
