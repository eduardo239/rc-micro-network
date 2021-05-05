import React from 'react';

import { useDispatch } from 'react-redux';
import { ReactComponent as DeleteIcon } from '../../assets/ico/white/carbon_close.svg';
import { delete_pm } from '../../store/comments';
import { Link } from 'react-router-dom';

const ProfilePrivateMessages = ({ login }) => {
  const dispatch = useDispatch();
  const deletePmHandler = (friendId) => {
    dispatch(delete_pm({ friendId }));
  };

  return (
    <>
      {login &&
        login.pm.map((m) => (
          <div key={m._id}>
            <Link to={`../profile/${m.friendId._id}`}>
              <img
                className='App-avatar-mini'
                src={m.friendId.imageAvatar}
                alt={m.friendId.name}
              />
            </Link>
            <p>{m.content}</p>
            <button
              onClick={() => deletePmHandler(m.friendId._id)}
              style={{ position: 'absolute', top: '0', right: '0' }}
              className='App-btn-icon-mini'
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
    </>
  );
};

export default ProfilePrivateMessages;
