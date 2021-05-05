import React from 'react';

import { useDispatch } from 'react-redux';
import { get_like, get_posts, get_post, delete_post } from '../../store/post';
import { closeModal, open_edit_post } from '../../store/modal';
import { Link } from 'react-router-dom';
import {
  Button,
  Label,
  Image,
  Icon,
  Segment,
  Confirm,
} from 'semantic-ui-react';

import avatar from '../../assets/img/avatar.png';

const PostIcons = ({ post, error, login }) => {
  const [state, setState] = React.useState({
    open: false,
    result: 'show the modal to capture a result',
  });

  const show = () => setState({ open: true });
  const handleConfirm = (id) => {
    setState({ result: 'confirmed', open: false });
    deleteHandler(id);
  };
  const handleCancel = () => setState({ result: 'cancelled', open: false });

  // const modal = useSelector((state) => state.modal.post_modal);
  const dispatch = useDispatch();

  const likeHandler = async () => {
    if (post) await dispatch(get_like(post._id));
    await dispatch(get_posts());
    dispatch(get_post(post._id));
  };

  // const commentHandler = () => {
  //   dispatch(get_post(post._id));
  //   dispatch(openModal());
  // };

  const deleteHandler = async (id) => {
    await dispatch(delete_post(id));
    await dispatch(closeModal());
    if (!error) dispatch(get_posts());
  };

  const editHandler = async (id) => {
    await dispatch(open_edit_post());
    if (!error) dispatch(get_posts());
  };

  /**login?._id === post.userId._id owner */
  const { result, open } = state;
  return (
    <div
      basic
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Link to={`profile/${post.userId._id}`}>
        <Label as='span' image>
          <img src={post.userId.imageAvatar || avatar} alt={post.userId.name} />
          {post.userId.name}Joe
        </Label>
      </Link>

      <Button.Group primary size='tiny'>
        <Button as='div' labelPosition='right'>
          <Button icon onClick={likeHandler}>
            <Icon name='heart' />
          </Button>
          <Label as='span' basic pointing='left'>
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

        <Button icon='trash alternate outline' onClick={show} />
        <Confirm
          open={open}
          onCancel={handleCancel}
          onConfirm={() => handleConfirm(post._id)}
        />
      </Button.Group>
      {error && <p className='App-message App-message-error'>{error}</p>}
    </div>
  );
};

export default PostIcons;
