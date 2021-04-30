import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { get_posts } from '../../store/post';

import { ReactComponent as SendIcon } from '../../assets/ico/white/carbon_send.svg';
import { ReactComponent as FileUpIcon } from '../../assets/ico/white/carbon_image.svg';

import styles from '../css/PostNew.module.css';

const PostNew = () => {
  const [message, setMessage] = React.useState('');
  const [file, setFile] = React.useState('');
  const [fileURL, setFileURL] = React.useState(null);
  const [content, setContent] = React.useState('');

  const { data: loginData } = useSelector((state) => state.user.login);

  const dispatch = useDispatch();

  const newPostHandler = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!content || !file) {
      setMessage('Content and/or image not found.');
      return;
    }
    if (loginData) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', loginData._id);
      formData.append('content', content);

      try {
        const config = {
          options: {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${JSON.parse(
                window.localStorage.getItem('token')
              )}`,
            },
          },
        };

        await axios.post('http://localhost:5000/api/posts', formData, config);

        await dispatch(get_posts());

        setContent('');
        setFile('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fileHandler = (e) => {
    setFileURL('');
    const file = e.target.files[0];
    setFileURL(URL.createObjectURL(e.target.files[0]));
    setFile(file);
  };

  return (
    <form onSubmit={newPostHandler} className={styles.PostNew}>
      <label htmlFor='imageUpload' className={styles.Label}>
        <FileUpIcon />
        <input
          style={{ display: 'none' }}
          type='file'
          name='image'
          id='imageUpload'
          onChange={fileHandler}
        />
      </label>
      <input
        type='text'
        value={content}
        placeholder='New Post here ..'
        onChange={({ target }) => setContent(target.value)}
      />
      <button onClick={newPostHandler} className='App-link'>
        <SendIcon />
      </button>
      {fileURL && <small>{fileURL}</small>}
      {message && <p className='App-message App-message-error'>{message}</p>}
    </form>
  );
};

export default PostNew;
