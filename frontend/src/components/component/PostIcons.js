import React from 'react';

import { useDispatch } from 'react-redux';
import { get_like, get_posts, get_post, delete_post } from '../../store/post';
import { closeModal, open_edit_post } from '../../store/modal';
import { Link } from 'react-router-dom';
import { Button, Label, Icon } from 'semantic-ui-react';

import avatar from '../../assets/img/avatar.png';

const PostIcons = ({ post, error, login }) => {
  const dispatch = useDispatch();

  const likeHandler = async () => {
    if (post) await dispatch(get_like(post._id));
    await dispatch(get_posts());
    dispatch(get_post(post._id));
  };

  const deleteHandler = async (id) => {
    await dispatch(delete_post(id));
    await dispatch(closeModal());
    if (!error) dispatch(get_posts());
  };

  const editHandler = async (id) => {
    await dispatch(open_edit_post());
    if (!error) dispatch(get_posts());
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Link to={`profile/${post.userId._id}`}>
        <Label as='span' image color='blue'>
          <img src={post.userId.imageAvatar || avatar} alt={post.userId.name} />
          {post.userId.name}
        </Label>
      </Link>

      <Button.Group primary size='tiny'>
        <Button as='div' labelPosition='right'>
          <Button icon onClick={likeHandler}>
            <Icon name='heart' />
          </Button>
          <Label as='span' pointing='left'>
            {post.likes}
          </Label>
        </Button>

        <Button as='div' labelPosition='right'>
          <Button icon>
            <Icon name='chat' />
          </Button>
          <Label as='span' basic pointing='left'>
            {post.comments.length}
          </Label>
        </Button>

        <Button icon='edit' onClick={() => editHandler(post._id)} />

        <Button
          icon='trash alternate outline'
          onClick={() => deleteHandler(post._id)}
        />
      </Button.Group>
      {error && <p className='App-message App-message-error'>{error}</p>}
    </div>
  );
};

export default PostIcons;
