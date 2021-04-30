import React from 'react';

import { useDispatch } from 'react-redux';
import { post_new_comment } from '../../store/comments';
import { get_post, get_posts } from '../../store/post';

import { ReactComponent as SendNewComment } from '../../assets/ico/white/carbon_send.svg';

import styles from '../css/CommentNew.module.css';

const CommentNew = ({ postId }) => {
  const [content, setContent] = React.useState('');

  const dispatch = useDispatch();

  const newCommentHandler = async (e) => {
    e.preventDefault();
    dispatch(get_posts());
    await dispatch(post_new_comment({ postId, content }));
    await dispatch(get_post(postId));
  };

  return (
    <form onSubmit={newCommentHandler} className={styles.CommentNew}>
      <input
        type='text'
        value={content}
        placeholder='Comment here ..'
        onChange={({ target }) => setContent(target.value)}
      />
      <button type='submit' className='App-link'>
        <SendNewComment />
      </button>
    </form>
  );
};

export default CommentNew;
