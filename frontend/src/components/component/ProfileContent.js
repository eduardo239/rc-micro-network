import React from 'react';

import { useSelector } from 'react-redux';
import { Segment, Tab } from 'semantic-ui-react';

import FriendsLists from './FriendsLists';
import ProfilePosts from './ProfilePosts';
import PMList from './PMList';

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
    render: ({ user }) => (
      <Tab.Pane>
        <PMList user={user} />
      </Tab.Pane>
    ),
  },
];

const ProfileContent = ({ user, login }) => {
  const { ui: theme } = useSelector((state) => state);
  return (
    <Segment inverted={theme !== 'light'}>
      <Tab panes={panes} user={user} login={login} />
    </Segment>
  );
};

export default ProfileContent;
