import React from 'react';

import { Button, Form, Grid } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { user_update } from '../store/user';

import Logo from './component/Logo';
import Menu from './component/Menu';

const Settings = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
  /*eslint-disable-next-line*/
  const [message, setMessage] = React.useState('');

  const dispatch = useDispatch();

  const { data: loginData } = useSelector((state) => state.user.login);

  const updateHandler = (e) => {
    setMessage('');
    e.preventDefault();
    if (password === passwordAgain) {
      const result = dispatch(user_update({ email, name, password }));
      if (result) setMessage('User Updated. ');
    } else {
      setMessage('Password do not match.');
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
      <Grid.Column width={3}>
        <Logo />
        <Menu />
      </Grid.Column>
      <Grid.Column width={7}>
        <h2>Settings</h2>
        {loginData && (
          <Form onSubmit={updateHandler}>
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

            <Button type='submit' secondary fluid size='small'>
              Update
            </Button>
          </Form>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Settings;
