import React from 'react';
import axios from 'axios';

import { Icon, Input, Message, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { get_posts } from '../../store/post';

const PostNew = () => {
  const [message, setMessage] = React.useState('');
  const [file, setFile] = React.useState('');
  const [fileURL, setFileURL] = React.useState(null);
  const [content, setContent] = React.useState('');

  const fileInputRef = React.createRef();
  const dispatch = useDispatch();

  const { data: loginData } = useSelector((state) => state.user.login);

  const newPostHandler = async (e) => {
    e.preventDefault();
    setMessage('');
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
    if (file) {
      setFileURL(URL.createObjectURL(e.target.files[0]));
      setFile(file);
    }
  };

  return (
    <form
      onSubmit={newPostHandler}
      style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '0.5rem' }}
    >
      <Button
        content='Image'
        labelPosition='left'
        icon='file'
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
        style={{ flex: 1 }}
        icon={<Icon onClick={newPostHandler} name='send' link />}
        placeholder='New Post here ..'
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
      {fileURL && <p>{fileURL}</p>}

      {message && <Message error header='Action Forbidden' content={message} />}
    </form>
  );
};

export default PostNew;
