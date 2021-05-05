import React from 'react';
// import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
// import { Link } from 'react-router-dom';

// import PmModal from './PmModal';
import FriendsLists from './FriendsLists';
// import ProfilePrivateMessages from './ProfilePrivateMessages';
import { Tab } from 'semantic-ui-react';
// import PM from './PM';

const panes = [
  {
    menuItem: 'Friends',
    render: ({ user, login }) => (
      <Tab.Pane>
        <FriendsLists user={user} login={login} />
      </Tab.Pane>
    ),
  },
  { menuItem: 'Posts', render: () => <Tab.Pane>X</Tab.Pane> },
  {
    menuItem: 'Private Messages',
    render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
  },
];

const ProfileContent = ({ user, login }) => {
  return (
    <Tab panes={panes} user={user} login={login} />

    // <div>
    //   {/* friends */}

    //   <div className='App-tab'>
    //     <div className='App-badge'>
    //       <button
    //         ref={usersLinkRef}
    //         className='App-tab-links'
    //         onClick={(e) => openTab(e, 0)}
    //       >
    //         Posts
    //       </button>
    //       <span>{user?.posts.length}</span>
    //     </div>
    //     <div className='App-badge'>
    //       <button
    //         ref={friendsLinkRef}
    //         className='App-tab-links'
    //         onClick={(e) => openTab(e, 1)}
    //       >
    //         Friends
    //       </button>
    //       <span>{user?.friends.length}</span>
    //     </div>
    //     <div className='App-badge'>
    //       <button
    //         ref={messagesLinkRef}
    //         className='App-tab-links'
    //         onClick={(e) => openTab(e, 2)}
    //       >
    //         Messages
    //       </button>
    //       <span>{user?.pm.length}</span>
    //     </div>
    //   </div>

    //   {/* posts */}
    //   <div
    //     ref={usersRef}
    //     className='App-tab-content'
    //     style={{ display: 'block' }}
    //   >
    //     <h3>Posts</h3>
    //     <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}>
    //       <Masonry>
    //         {user &&
    //           user.posts?.map((p) => (
    //             <div key={p._id}>
    //               <Link to={`../post/${p._id}`}>
    //                 <img className='App-post-mini' src={p.image} alt={p.name} />
    //               </Link>
    //             </div>
    //           ))}
    //       </Masonry>
    //     </ResponsiveMasonry>
    //   </div>

    //   {/* friends */}
    //   <div ref={friendsRef}>
    //     <h3>Friends</h3>

    //     {/* <div key={f._id}>
    //               <FriendsLists
    //                 pmHandler={pmHandler}
    //                 friend={f}
    //                 login={login}
    //               />
    //             </div> */}
    //   </div>
    //   {/* messages */}

    //   <div ref={messagesRef} className='App-tab-content'>
    //     <h3>Private Message</h3>
    //     {login._id === user._id && <ProfilePrivateMessages login={login} />}
    //   </div>
    //   {/* modal */}
    //   {pmModal && (
    //     <PmModal setPmModal={setPmModal} friend={friend} login={login} />
    //   )}
    // </div>
  );
};

export default ProfileContent;
