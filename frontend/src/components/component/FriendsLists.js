import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { remove_friend } from '../../store/user';
import { Button, Icon, Image, List } from 'semantic-ui-react';

import avatar from '../../assets/img/avatar.png';

const FriendsLists = ({ user, login }) => {
  const dispatch = useDispatch();

  const removeFriendHandler = async (id) => {
    dispatch(remove_friend({ userId: login._id, friendId: id }));
  };

  return (
    <List divided verticalAlign='middle'>
      {user.friends &&
        user.friends.map((f) => (
          <List.Item key={f._id}>
            <List.Content floated='right'>
              <Button.Group size='tiny'>
                <Button icon color='green'>
                  <Icon name='chat' />
                </Button>
                <Button
                  onClick={() => removeFriendHandler(f._id)}
                  icon
                  color='red'
                >
                  <Icon name='trash' />
                </Button>
              </Button.Group>
            </List.Content>
            <Link
              style={{ display: 'flex', alignItems: 'center' }}
              to={`../profile/${f.friendId._id}`}
            >
              <Image avatar src={f.friendId.imageAvatar || avatar} />
              <List.Content>{f.friendId.name}</List.Content>
            </Link>
          </List.Item>
        ))}
    </List>

    // <div>
    //   <div>
    //     <Link to={`../profile/${friend?.friendId?._id}`}>
    //       <div
    //         className='App-avatar-mini'
    //         style={{
    //           background: `url(${friend?.friendId?.imageAvatar || avatar})`,
    //         }}
    //       ></div>
    //       {friend?.friendId?.name || 'User not found'}
    //     </Link>
    //   </div>
    //   {friend.userId._id === login._id && (
    //     <div>
    //       <button
    //         onClick={() => pmHandler(friend?.friendId || null)}
    //         className='App-btn-icon-mini'
    //       >
    //         <ChatIcon />
    //       </button>
    //       <button
    //         onClick={() => removeFriendHandler(friend?.friendId?._id)}
    //         className='App-btn-icon-mini'
    //       >
    //         <DeleteIcon />
    //       </button>
    //     </div>
    //   )}
    // </div>
  );
};

export default FriendsLists;
