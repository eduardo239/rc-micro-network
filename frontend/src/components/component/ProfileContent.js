import React from 'react';

import { useSelector } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import FriendsLists from './FriendsLists';
import ProfilePosts from './ProfilePosts';
import PmModal from './PmModal';

const panes = [
  {
    menuItem: 'Friends',
    render: ({ user, login, theme }) => (
      <Tab.Pane inverted={theme !== 'light'}>
        <FriendsLists user={user} login={login} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Posts',
    render: ({ user, theme }) => (
      <Tab.Pane inverted={theme !== 'light'}>
        <ProfilePosts user={user} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Private Messages',
    render: ({ login, theme }) => (
      <Tab.Pane inverted={theme !== 'light'}>
        <PmModal login={login} />
      </Tab.Pane>
    ),
  },
];

const ProfileContent = ({ user, login }) => {
  const { ui: theme } = useSelector((state) => state);
  return (
    <Tab
      panes={panes}
      user={user}
      login={login}
      theme={theme}
      inverted={theme !== 'light'}
    />
  );
};

export default ProfileContent;
