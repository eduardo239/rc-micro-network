import React from 'react';

import { Link } from 'react-router-dom';
import { dateFormat } from '../../helper/dateFormat';

import avatar from '../../assets/img/avatar.png';

const User = ({ user }) => {
  return (
    <div>
      <div>
        {user && (
          <>
            <div
              className='App-avatar-mini'
              style={{ background: `url(${user.imageAvatar || avatar})` }}
            ></div>
            <Link to={`profile/${user._id}`}>{user.name}</Link>
            <div>
              <p>{`User since: ${dateFormat(user.createdAt)}`}</p>
              <p>Friends: {user.friends.length}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
