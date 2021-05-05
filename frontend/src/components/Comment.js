import React from 'react';

import { Link } from 'react-router-dom';
import { delete_comment } from '../store/comments';
import { useDispatch } from 'react-redux';
import { get_post } from '../store/post';
import { Button, Comment, Segment } from 'semantic-ui-react';

import CommentNew from './component/CommentNew';
import avatar from '../assets/img/avatar.png';

const Comment2 = ({ user, comments, postId }) => {
  const dispatch = useDispatch();

  // const editRef = createRef();

  // const [content, setContent] = React.useState('');
  // const [editing, setEditing] = React.useState(false);
  // const [commentId, setCommentId] = React.useState('');

  // const editCommentHandler = async (id) => {
  //   setEditing(!editing);
  //   setCommentId(id);
  //   if (commentId) setCommentId('');
  // };

  // const saveCommentHandler = async (commentId) => {
  //   await dispatch(edit_comment({ id: commentId, content }));
  //   await dispatch(get_post(postId));
  // };

  // const onChangeHandler = (e) => {
  //   editRef.current.focus();
  //   setContent(e.target.value);
  // };

  const deleteCommentHandler = async (id) => {
    await dispatch(delete_comment(id));
    await dispatch(get_post(postId));
  };

  return (
    <div>
      <Comment.Group>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment>
              <Comment.Avatar
                as='a'
                src={comment.userId.imageAvatar || avatar}
              />
              <Comment.Content>
                <Link to={`./profile/${comment.userId._id}`}>
                  <Comment.Author as='span'>
                    {comment.userId.name || 'Null'}
                  </Comment.Author>
                </Link>
                <Comment.Metadata>
                  <span>{comment.createdAt}</span>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                  <Button.Group size='mini' style={{ margin: '0 0.5rem' }}>
                    <Button icon='like' onClick={() => console.log('oi')} />
                    <Button icon='chat' onClick={() => console.log('oi')} />
                    <Button icon='edit' onClick={() => console.log('oi')} />
                    <Button
                      icon='delete'
                      onClick={() => deleteCommentHandler(comment._id)}
                    />
                  </Button.Group>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
      </Comment.Group>
      {/* <Comment.Avatar src={comment.userId.imageAvatar || avatar} /> */}
      <CommentNew postId={postId} />
    </div>
  );
};

export default Comment2;
