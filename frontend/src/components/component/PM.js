import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Image, Message, Segment } from 'semantic-ui-react';
import { post_pm } from '../../store/comments';
import { get_user_by_id } from '../../store/user';

const PM = ({ user, setModal, modal }) => {
  const [content, setContent] = React.useState('');
  const [message, setMessage] = React.useState(false);
  const dispatch = useDispatch();
  const { ui: theme } = useSelector((state) => state);

  const pmHandler = async () => {
    const response = await dispatch(post_pm({ content, friendId: user._id }));
    setMessage(response);
    setTimeout(() => setMessage(''), 2000);
    await dispatch(get_user_by_id(user._id));
  };

  return (
    <>
      <Segment style={{ margin: '0' }} basic inverted={theme !== 'light'}>
        {user ? (
          <Form onSubmit={pmHandler}>
            <Form.Field>
              <div style={{ padding: '1rem 0' }}>
                <Image src={user.imageAvatar} avatar />
                <span>{user.name}</span>
              </div>
              <input
                placeholder='Private message'
                value={content}
                onChange={({ target }) => setContent(target.value)}
              />
            </Form.Field>
            <Button type='submit' primary fluid size='small'>
              Submit
            </Button>
          </Form>
        ) : (
          <p>User not found</p>
        )}
        {message && (
          <Message
            style={{ width: '100%', textAlign: 'center' }}
            compact
            success
            content='PM sent'
          />
        )}
      </Segment>
      <Button
        onClick={() => setModal(!modal)}
        className='App-btn--absolute'
        color='red'
      >
        close
      </Button>
    </>
  );
};

export default PM;
