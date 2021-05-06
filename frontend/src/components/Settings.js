import React from 'react';

import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { user_update } from '../store/user';

import Logo from './component/Logo';
import Menu from './component/Menu';
import MenuIcon from './component/MenuIcon';

const Settings = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [message, setMessage] = React.useState('');

  const dispatch = useDispatch();

  const { data: loginData } = useSelector((state) => state.user.login);
  const { ui: theme } = useSelector((state) => state);

  const updateHandler = async (e) => {
    setErrorMessage('');
    setMessage('');
    e.preventDefault();
    if (password === passwordAgain) {
      await dispatch(user_update({ email, name, password }));
      setMessage('User updated.');
    } else {
      setErrorMessage('Password do not match.');
    }
  };

  React.useEffect(() => {
    if (loginData) {
      setEmail(loginData.email);
      setName(loginData.name);
    }
  }, [loginData]);
  return (
    <Grid centered doubling stackable>
      <Grid.Column width={4} only='tablet computer'>
        <Logo />
        <Menu />
      </Grid.Column>
      <Grid.Column width={4} only='mobile'>
        <MenuIcon />
      </Grid.Column>
      <Grid.Column width={8}>
        {loginData && (
          <Segment
            style={{ marginTop: '1rem' }}
            padded
            inverted={theme !== 'light'}
          >
            <h2>Settings</h2>
            <Form onSubmit={updateHandler} inverted={theme !== 'light'}>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder='Email'
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </Form.Field>

              <Form.Field>
                <label>Name</label>
                <input
                  placeholder='name'
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </Form.Field>

              <Form.Field>
                <label>Password</label>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </Form.Field>

              <Form.Field>
                <label>Password Again</label>
                <input
                  type='password'
                  placeholder='Password'
                  value={passwordAgain}
                  onChange={({ target }) => setPasswordAgain(target.value)}
                />
              </Form.Field>

              <Button type='submit' color='yellow' fluid size='small'>
                Update
              </Button>
            </Form>
            {errorMessage && (
              <Message error header='Action Forbidden' content={errorMessage} />
            )}

            {message && (
              <Message success header='Successful' content={message} />
            )}
          </Segment>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Settings;
