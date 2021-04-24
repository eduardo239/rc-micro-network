import React from 'react';

import { Link } from 'react-router-dom';
import { delete_comment } from '../store/comments';
import { useDispatch } from 'react-redux';

import CommentNew from './component/CommentNew';

import avatar from '../assets/img/avatar.png';

import { ReactComponent as DeleteIcon } from '../assets/ico/white/carbon_delete.svg';
import { get_post } from '../store/post';

const Comment = ({ user, comments, postId }) => {
  const dispatch = useDispatch();

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
            <div key={Math.random()} className='App-comments'>
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
                <p className='text-small'>{comment.content}</p>
                {user._id === comment.userId._id && (
                  <button
                    onClick={() => deleteCommentHandler(comment._id)}
                    className='App-btn-icon-mini'
                  >
                    <DeleteIcon />
                  </button>
                )}
              </div>
            </div>
          ))
          .reverse()
      ) : (
        <p className='App-comments'>No comments @</p>
      )}
    </div>
  );
};

export default Comment;
