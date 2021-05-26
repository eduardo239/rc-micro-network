import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFriend } from '../../store/user';
import { Button, Icon, Image, List } from 'semantic-ui-react';

import avatar from '../../assets/img/avatar.png';
import PM from '../component/PM';

const FriendsLists = ({ user, login }) => {
  const modalRef = React.createRef();
  const [modal, setModal] = React.useState(false);
  const [friend, setFriend] = React.useState(null);

  const modalHandler = (friend) => {
    setFriend(friend);
    setModal(!modal);
  };
  const dispatch = useDispatch();

  const removeFriendHandler = async (id) => {
    dispatch(removeFriend({ userId: login._id, friendId: id }));
  };

  const clickOutsideHandler = (e) => {
    if (modalRef?.current)
      if (modalRef && !modalRef.current.contains(e.target)) {
        setModal(!modal);
      }
  };

  return (
    <List divided verticalAlign='middle'>
      {user.friends &&
        user.friends.map((f) => (
          <List.Item key={f._id}>
            <List.Content floated='right'>
              <Button.Group size='tiny'>
                <Button
                  icon
                  color='green'
                  onClick={() => modalHandler(f.friendId)}
                >
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
      {modal && (
        <div className='App-modal--container' onClick={clickOutsideHandler}>
          <div className='App-modal--content' ref={modalRef}>
            <PM user={friend} setModal={setModal} modal={modal} />
          </div>
        </div>
      )}
    </List>
  );
};

export default FriendsLists;
