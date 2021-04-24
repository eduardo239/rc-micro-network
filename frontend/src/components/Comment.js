import React from 'react';

import { Link } from 'react-router-dom';

import CommentNew from './component/CommentNew';

import avatar from '../assets/img/avatar.png';

const Comment = ({ comments, postId }) => {
  return (
    <div>
      <CommentNew postId={postId} />
      {comments.length > 0 ? (
        comments.map((comment) => (
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
            <p className='text-small'>{comment.content}</p>
          </div>
        ))
      ) : (
        <p className='App-comments'>No comments @</p>
      )}
    </div>
  );
};

export default Comment;
