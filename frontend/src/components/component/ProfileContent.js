import React, { createRef } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';

import PmModal from './PmModal';
import FriendsLists from './FriendsLists';
import ProfilePrivateMessages from './ProfilePrivateMessages';
import styles from '../css/ProfileContent.module.css';

const ProfileContent = ({ user, login }) => {
  const usersLinkRef = createRef();
  const friendsLinkRef = createRef();
  const messagesLinkRef = createRef();

  const usersRef = createRef();
  const friendsRef = createRef();
  const messagesRef = createRef();

  const [pmModal, setPmModal] = React.useState(false);
  const [friend, setFriend] = React.useState({});

  const pmHandler = (friend) => {
    setPmModal(true);
    setFriend(friend);
  };

  const openTab = (e, key) => {
    const tabLinks = [usersLinkRef, friendsLinkRef, messagesLinkRef];
    const tabContent = [usersRef, friendsRef, messagesRef];

    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].current.style.display = 'none';
      tabContent[key].current.style.display = 'block';
    }

    for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].current.className = tabLinks[i].current.className.replace(
        ' active',
        ''
      );
    }

    e.target.className += ' active';
  };

  return (
    <div>
      {/* friends */}

      <div className='App-tab'>
        <button
          ref={usersLinkRef}
          className='App-tab-links'
          onClick={(e) => openTab(e, 0)}
        >
          Posts
        </button>
        <button
          ref={friendsLinkRef}
          className='App-tab-links'
          onClick={(e) => openTab(e, 1)}
        >
          Friends
        </button>
        <button
          ref={messagesLinkRef}
          className='App-tab-links'
          onClick={(e) => openTab(e, 2)}
        >
          Messages
        </button>
      </div>

      {/* posts */}
      <div
        ref={usersRef}
        className='App-tab-content'
        style={{ display: 'block' }}
      >
        <h3>Posts</h3>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}>
          <Masonry>
            {user &&
              user.posts?.map((p) => (
                <div key={p._id}>
                  <Link to={`../post/${p._id}`}>
                    <img className='App-post-mini' src={p.image} alt={p.name} />
                  </Link>
                </div>
              ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* friends */}
      <div ref={friendsRef} className='App-tab-content'>
        <h3>Friends</h3>
        <div className={styles.FriendsContainer}>
          <div className={styles.Friends}>
            {user &&
              user.friends.map((f) => (
                <div key={f._id} className={styles.List}>
                  <FriendsLists
                    pmHandler={pmHandler}
                    friend={f}
                    login={login}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* messages */}

      <div ref={messagesRef} className='App-tab-content'>
        <h3>Private Message</h3>
        {login._id === user._id && <ProfilePrivateMessages login={login} />}
      </div>
      {/* modal */}
      {pmModal ? (
        <PmModal setPmModal={setPmModal} friend={friend} login={login} />
      ) : (
        <p>Private messages not found.</p>
      )}
    </div>
  );
};

export default ProfileContent;
