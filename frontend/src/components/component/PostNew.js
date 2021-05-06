import React from 'react';
import axios from 'axios';

import { Icon, Input, Message, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { get_posts } from '../../store/post';

const PostNew = () => {
  const [message, setMessage] = React.useState('');
  const [file, setFile] = React.useState('');
  // eslint-disable-next-line
  const [fileURL, setFileURL] = React.useState(null);
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisable] = React.useState(false);

  const fileInputRef = React.createRef();
  const dispatch = useDispatch();

  const { data: loginData } = useSelector((state) => state.user.login);

  const newPostHandler = async (e) => {
    e.preventDefault();
    setMessage('');
    setDisable(true);
    if (loginData) {
      setLoading(true);
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
      } finally {
        setLoading(false);
        setDisable(false);
      }
    }
  };

  const fileHandler = (e) => {
    e.preventDefault();
    setFileURL('');

    const file = e.target.files[0];
    if (file) {
      setFileURL(URL.createObjectURL(e.target.files[0]));
      setFile(file);
    }
  };

  return (
    <div style={{ display: 'flex', marginBottom: '.5rem' }}>
      <Button
        disabled={disabled}
        content='Image'
        labelPosition='left'
        icon='file'
        size='small'
        primary
        onClick={() => fileInputRef.current.click()}
      />

      <input
        ref={fileInputRef}
        type='file'
        id='imageUpload'
        hidden
        onChange={fileHandler}
      />

      <Input
        disabled={disabled}
        loading={loading}
        style={{ flex: 1 }}
        icon={<Icon onClick={newPostHandler} name='send' link />}
        placeholder='New Post here ..'
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />

      {message && <Message error header='Action Forbidden' content={message} />}
    </div>
  );
};

export default PostNew;
