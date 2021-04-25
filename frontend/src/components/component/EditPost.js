import React from 'react';

import { useDispatch } from 'react-redux';
import { edit_post, get_post } from '../../store/post';
import { close_edit_post } from '../../store/modal';

import { ReactComponent as SaveIcon } from '../../assets/ico/white/carbon_save.svg';
import { ReactComponent as CloseIcon } from '../../assets/ico/white/carbon_close.svg';

const EditPost = ({ post }) => {
  const [content, setContent] = React.useState('');

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
    <div style={{ padding: '0.25rem', position: 'relative' }}>
      <input
        type='text'
        placeholder='Edit Post ..'
        style={{ padding: '0.5rem' }}
        onChange={({ target }) => setContent(target.value)}
        value={content}
      />
      <div style={{ position: 'absolute', top: '0', right: '0' }}>
        <button className='App-btn-icon' onClick={updateHandler}>
          <SaveIcon />
        </button>
        <button className='App-btn-icon'>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default EditPost;
