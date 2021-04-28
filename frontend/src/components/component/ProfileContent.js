import React from 'react';

import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

import styles from '../css/ProfileContent.module.css';

import { ReactComponent as DeleteIcon } from '../../assets/ico/white/carbon_delete.svg';
import { ReactComponent as ChatIcon } from '../../assets/ico/white/carbon_chat.svg';

import avatar from '../../assets/img/avatar.png';
import PmModal from './PmModal';
import ProfilePrivateMessages from './ProfilePrivateMessages';

const ProfileContent = ({ user, login }) => {
  const [pmModal, setPmModal] = React.useState(false);
  const [friend, setFriend] = React.useState({});
  // const dispatch = useDispatch();

  const pmHandler = (friend) => {
    setPmModal(true);
    setFriend(friend);
  };

  return (
    <div>
      <div>
        <h3>Posts</h3>
        {user && user.posts?.map((p) => <div key={p._id}>{p._id}</div>)}
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
                    onClick={() => pmHandler(f.friendId)}
                    className='App-btn-icon-mini'
                  >
                    <ChatIcon />
                  </button>

                  {login._id === user._id && (
                    <button className='App-btn-icon-mini'>
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
        {/* modal */}
        {pmModal && (
          <PmModal setPmModal={setPmModal} friend={friend} login={login} />
        )}
      </div>
      {/* pm */}

      <div>
        {login._id === user._id && (
          <>
            <h3>Private Message</h3>
            <ProfilePrivateMessages login={login} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
