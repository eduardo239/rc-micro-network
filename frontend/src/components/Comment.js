import React, { createRef } from 'react';

import { Link } from 'react-router-dom';
import { delete_comment, edit_comment } from '../store/comments';
import { useDispatch } from 'react-redux';

import CommentNew from './component/CommentNew';

import avatar from '../assets/img/avatar.png';

import { ReactComponent as DeleteIcon } from '../assets/ico/white/carbon_delete.svg';
import { ReactComponent as EditIcon } from '../assets/ico/white/carbon_edit.svg';
import { ReactComponent as SaveIcon } from '../assets/ico/white/carbon_save.svg';
import { get_post } from '../store/post';

const Comment = ({ user, comments, postId }) => {
  const dispatch = useDispatch();

  const editRef = createRef();

  const [content, setContent] = React.useState('');
  const [editing, setEditing] = React.useState(false);
  const [commentId, setCommentId] = React.useState('');

  const editCommentHandler = async (id) => {
    setEditing(!editing);
    setCommentId(id);
    if (commentId) setCommentId('');
  };

  const saveCommentHandler = async (commentId) => {
    await dispatch(edit_comment({ id: commentId, content }));
    await dispatch(get_post(postId));
  };

  const onChangeHandler = (e) => {
    editRef.current.focus();
    setContent(e.target.value);
  };

  const deleteCommentHandler = async (id) => {
    await dispatch(delete_comment(id));
    await dispatch(get_post(postId));
  };

  return (
    <div>
      <CommentNew postId={postId} />
      {comments.length > 0 ? (
        comments
          .map((comment) => (
            <div
              key={Math.random()}
              className={`${
                user._id === comment.userId._id
                  ? 'App-comments-owner'
                  : 'App-comments'
              } `}
            >
              <div
                className='App-avatar-mini'
                style={{
                  background: `url(${comment.userId.imageAvatar || avatar})`,
                }}
              ></div>
              <span className='App-comment-author'>
                <Link to={`profile/${comment.userId._id}`}>
                  {comment.userId.name}
                </Link>
              </span>
              <div className='App-comment'>
                {/* <p className='text-small'>{comment.content}</p> */}

                {user._id === comment.userId._id &&
                comment._id === commentId ? (
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      ref={editRef}
                      type='text'
                      style={{ padding: '0.3rem' }}
                      value={content}
                      onChange={onChangeHandler}
                    />
                    <button
                      style={{
                        position: 'absolute',
                        top: '0.35rem',
                        right: '0.45rem',
                        padding: '0',
                      }}
                      onClick={() => saveCommentHandler(comment._id)}
                      className='App-btn-icon-mini'
                    >
                      <SaveIcon />
                    </button>
                  </div>
                ) : (
                  <p className='text-small'>{comment.content}</p>
                )}

                {user._id === comment.userId._id && (
                  <div style={{ display: 'flex' }}>
                    <button
                      onClick={() => editCommentHandler(comment._id)}
                      className='App-btn-icon-mini'
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => deleteCommentHandler(comment._id)}
                      className='App-btn-icon-mini'
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
          .reverse()
      ) : (
        <div style={{ margin: '.5rem' }}>
          <p className='App-message App-message-primary'>No comments here.</p>
        </div>
      )}
    </div>
  );
};

export default Comment;
