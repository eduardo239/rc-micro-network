import React from 'react';

import styles from '../css/ProfileContent.module.css';
// eslint-disable-next-line
import PmModal from './PmModal';
import ProfilePrivateMessages from './ProfilePrivateMessages';
import FriendsLists from './FriendsLists';

const ProfileContent = ({ user, login }) => {
  const [pmModal, setPmModal] = React.useState(false);
  const [friend, setFriend] = React.useState({});

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
                <FriendsLists pmHandler={pmHandler} friend={f} login={login} />
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
