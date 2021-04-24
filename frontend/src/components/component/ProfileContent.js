import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { remove_friend } from '../../store/user';
import { send_pm } from '../../store/comments';

import styles from '../css/ProfileContent.module.css';

import { ReactComponent as DeleteIcon } from '../../assets/ico/white/carbon_delete.svg';
import { ReactComponent as ChatIcon } from '../../assets/ico/white/carbon_chat.svg';

import avatar from '../../assets/img/avatar.png';

const ProfileContent = ({ user, login }) => {
  const [pmModal, setPmModal] = React.useState(false);
  const [content, setContent] = React.useState('');

  const modalRef = React.createRef();

  const dispatch = useDispatch();

  const clickOutsideHandler = (e) => {
    if (modalRef && !modalRef.current.contains(e.target)) {
      setPmModal(false);
    }
  };

  const pmHandler = (friendId) => {
    dispatch(send_pm({ content, friendId }));
  };

  const removeHandler = (friendId, userId) => {
    dispatch(remove_friend({ friendId, userId }));
  };

  return (
    <div>
      <div>
        <h3>Posts</h3>
        {user && user.posts.map((p) => <div key={p._id}>{p._id}</div>)}
      </div>
      {/* friends */}
      <div className={styles.FriendsContainer}>
        <div className={styles.Friends}>
          <h3>Friends</h3>
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
                  <button
                    onClick={() => setPmModal(true)}
                    className='App-btn-icon-mini'
                  >
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
                {pmModal && (
                  <div
                    className='App-modal-container'
                    onClick={clickOutsideHandler}
                  >
                    <div className={`${styles.Modal} App-PM`} ref={modalRef}>
                      <button
                        onClick={() => setPmModal(false)}
                        className='App-btn App-btn-secondary'
                      >
                        close
                      </button>
                      <h4>Private Message</h4>
                      <p>to {f.friendId.name}</p>
                      <input
                        type='text'
                        value={content}
                        onChange={({ target }) => setContent(target.value)}
                      />
                      {/* FIXME */}
                      <button
                        onClick={() => pmHandler(f.friendId._id)}
                        type='submit'
                        className='App-btn App-btn-primary'
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
                {/*  */}
              </div>
            ))}
        </div>
      </div>
      {/* modal */}

      <div>
        <h3>Private Message</h3>
        {/* {pmData && pmData.map((x) => <p key={x._id}>{x}</p>)} */}
      </div>
    </div>
  );
};

export default ProfileContent;
