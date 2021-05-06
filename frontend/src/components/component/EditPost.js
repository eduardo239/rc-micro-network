import React from 'react';

import { useDispatch } from 'react-redux';
import { edit_post, get_post } from '../../store/post';
import { close_edit_post } from '../../store/modal';
import { Input, Segment } from 'semantic-ui-react';

const EditPost = ({ post }) => {
  const [content, setContent] = React.useState(post.content || '');

  const dispatch = useDispatch();

  const updateHandler = async () => {
    if (content && post) {
      await dispatch(edit_post({ id: post._id, content }));
      dispatch(get_post(post._id));
      dispatch(close_edit_post());
    } else {
      alert('Empty content.');
      dispatch(close_edit_post());
    }
  };

  return (
    <Segment basic>
      <Input
        fluid
        action={{
          color: 'primary',
          labelPosition: 'right',
          icon: 'edit',
          content: 'Edit',
          onClick: () => updateHandler(),
        }}
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
    </Segment>
  );
};

export default EditPost;
