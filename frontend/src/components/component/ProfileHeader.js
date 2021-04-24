import React from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { add_friend } from '../../store/user';

import Loading from '../component/Loading';

import bgHeader from '../../assets/img/profile-bg.jpg';
import avatarDefault from '../../assets/img/avatar.png';

import styles from '../css/ProfileHeader.module.css';

import { dateFormat, sinceDate } from '../../helper/dateFormat';
import get_local_storage from '../../store/helpers/getLocalStorage';

const ProfileHeader = ({ user, login }) => {
  const dispatch = useDispatch();

  const fileRef = React.useRef();
  // eslint-disable-next-line
  const [avatar, setAvatar] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const avatarHandler = async () => {
    setLoading(true);

    const avatarFile = fileRef.current.files[0];
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${get_local_storage('token')}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/upload/avatar',
        formData,
        config
      );

      setAvatar(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addHandler = () => {
    dispatch(add_friend({ userId: login._id, friendId: user._id }));
  };
  return (
    <div>
      <div className={styles.ImageContainer}>
        <img className={styles.Background} src={bgHeader} alt='Profile' />

        {/* avatar */}
        {loading ? (
          <Loading />
        ) : (
          <label htmlFor='avatar' style={{ cursor: 'pointer' }}>
            <div
              className='App-avatar'
              style={{
                background: `url(${user.imageAvatar || avatarDefault})`,
              }}
            ></div>
          </label>
        )}

        <input
          type='file'
          name='avatar'
          id='avatar'
          ref={fileRef}
          style={{ display: 'none' }}
          onChange={avatarHandler}
        />
      </div>
      <div className={styles.Stats}>
        <div>
          <p>{user.name}</p>
          <p>{`Member since: ${sinceDate(
            user.createdAt
          )} days. Registration date:  ${dateFormat(user.createdAt)}`}</p>
        </div>
        <div>
          {user._id !== login._id && (
            <button
              onClick={() => addHandler(user._id)}
              className='App-btn App-btn-primary'
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
