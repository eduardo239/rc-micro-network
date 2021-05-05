import React from 'react';

import { useDispatch } from 'react-redux';
import { post_new_comment } from '../../store/comments';
import { get_post, get_posts } from '../../store/post';
import { Icon, Input } from 'semantic-ui-react';

const CommentNew = ({ postId }) => {
  const [content, setContent] = React.useState('');

  const dispatch = useDispatch();

  const newCommentHandler = async (e) => {
    e.preventDefault();
    dispatch(get_posts());
    await dispatch(post_new_comment({ postId, content }));
    await dispatch(get_post(postId));
    setContent('');
  };

  return (
    <form style={{ display: 'flex' }} onSubmit={newCommentHandler}>
      <Input
        style={{ flex: 1 }}
        icon={<Icon onClick={newCommentHandler} name='send' link />}
        placeholder='New Comment here ..'
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
    </form>
  );
};

export default CommentNew;
