import React from 'react';

import { Tab } from 'semantic-ui-react';

import FriendsLists from './FriendsLists';
import ProfilePosts from './ProfilePosts';

const panes = [
  {
    menuItem: 'Friends',
    render: ({ user, login }) => (
      <Tab.Pane>
        <FriendsLists user={user} login={login} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Posts',
    render: ({ user }) => (
      <Tab.Pane>
        <ProfilePosts user={user} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Private Messages',
    render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
  },
];

const ProfileContent = ({ user, login }) => {
  return <Tab panes={panes} user={user} login={login} />;
};

export default ProfileContent;
