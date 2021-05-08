import React from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { add_friend, get_user_by_id, remove_friend } from '../../store/user';
import { dateFormat, sinceDate } from '../../helper/dateFormat';
import { Button, Header, Image, List, Popup, Segment } from 'semantic-ui-react';

import avatar from '../../assets/img/avatar.png';
import get_local_storage from '../../store/helpers/getLocalStorage';

const ProfileHeader = ({ user, login }) => {
  const dispatch = useDispatch();

  const fileRef = React.createRef();
  const [friend, setFriend] = React.useState(false);
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

      // eslint-disable-next-line
      const { data } = await axios.post(
        'http://localhost:5000/api/upload/avatar',
        formData,
        config
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      await dispatch(get_user_by_id(user._id));
    }
  };

  const addFriend = async () => {
    await dispatch(add_friend({ userId: login._id, friendId: user._id }));
    await dispatch(get_user_by_id(user._id));
  };

  const deleteFriend = async () => {
    await dispatch(remove_friend({ userId: login._id, friendId: user._id }));
    await dispatch(get_user_by_id(user._id));
  };

  return (
    <Segment style={{ marginTop: '1rem' }} basic loading={loading}>
      <Header as='h2' textAlign='center' color='blue'>
        <div>
          <label htmlFor='avatarUpload' style={{ cursor: 'pointer' }}>
            {user && (
              <Popup
                content='Update avatar image.'
                trigger={
                  <Image
                    size='small'
                    circular
                    src={user.imageAvatar || avatar}
                    avatar
                  />
                }
              />
            )}
          </label>
        </div>
        <Header.Content>{user.name || 'User not found!'}</Header.Content>
        <input
          type='file'
          name='avatarUpload'
          id='avatarUpload'
          onChange={avatarHandler}
          ref={fileRef}
          style={{ display: 'none' }}
        />
      </Header>
      <List>
        <List.Item>
          <List.Icon name='users' />
          <List.Content>{`Member since: ${sinceDate(
            user.createdAt
          )} days.`}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='marker' />
          <List.Content>{`Registration date: ${dateFormat(
            user.createdAt
          )}`}</List.Content>
        </List.Item>
      </List>

      {login.friends.find((f) => f.friendId === user._id) ? (
        <Button onClick={() => deleteFriend(user._id)} color='red'>
          Remover
        </Button>
      ) : login._id === user._id ? (
        ''
      ) : (
        <Button onClick={() => addFriend(user._id)} color='blue'>
          Adicionar
        </Button>
      )}
    </Segment>
  );
};

export default ProfileHeader;
