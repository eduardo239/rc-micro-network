import React from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { add_friend, get_user_by_id, remove_friend } from '../../store/user';
import { dateFormat, sinceDate } from '../../helper/dateFormat';
import { Button, Header, Icon, Image, List, Segment } from 'semantic-ui-react';

import avatar from '../../assets/img/avatar.png';
import get_local_storage from '../../store/helpers/getLocalStorage';

const ProfileHeader = ({ user, login }) => {
  const dispatch = useDispatch();

  const fileRef = React.createRef();
  // eslint-disable-next-line
  const [avatarU, setAvatarU] = React.useState('');
  const [friend, setFriend] = React.useState(false);
  //eslint-disable-next-line
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

      setAvatarU(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      // dispatch(get_user_by_id(user._id));
    }
  };

  const friendHandler = async (friendId) => {
    if (friend) {
      await dispatch(remove_friend({ userId: login._id, friendId }));
    } else {
      await dispatch(add_friend({ userId: login._id, friendId: user._id }));
    }
    await dispatch(get_user_by_id(user._id));
  };

  // const updateButton = () => {};

  React.useEffect(() => {
    if (login)
      login.friends.filter((friend) => setFriend(friend.friendId === user._id));
  }, [login, user]);

  return (
    <Segment style={{ marginTop: '1.5rem' }} basic>
      <Header as='h2' textAlign='center' color='blue'>
        <div>
          <label htmlFor='avatarUpload' style={{ cursor: 'pointer' }}>
            <Image circular src={user.imageAvatar || avatar} avatar />
          </label>
        </div>
        <Header.Content>{user.name || 'None'}</Header.Content>
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

      {user._id !== login._id && (
        <Button
          onClick={() => friendHandler(user._id)}
          color={`${friend ? 'red' : 'green'}`}
        >
          {friend ? 'Remove' : 'Add'}
        </Button>
      )}
    </Segment>
  );
};

export default ProfileHeader;
