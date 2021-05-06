import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_token } from '../store/user';
import { Button, Checkbox, Form, Grid, Menu, Message } from 'semantic-ui-react';

import MenuIcon from './component/MenuIcon';

const Login = ({ history }) => {
  const [email, setEmail] = React.useState('admin@email.com');
  const [password, setPassword] = React.useState('123');

  const { ui: theme } = useSelector((state) => state);

  const dispatch = useDispatch();

  const {
    data: loginData,
    error: loginError,
    loading: loginLoading,
  } = useSelector((state) => state.user.login);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(get_token({ email, password }));
  };

  React.useEffect(() => {
    if (loginData) history.push('/');
  }, [loginData, history]);

  return (
    <Grid centered doubling stackable>
      <Grid.Column width={6}>
        <MenuIcon />
        <h2>Login</h2>
        <Form
          onSubmit={loginHandler}
          loading={loginLoading ? true : false}
          inverted={theme !== 'light'}
        >
          <Form.Field>
            <label>Email</label>
            <input
              placeholder='Email'
              type='email'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input
              placeholder='Password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Field>

          <Form.Field>
            <Checkbox label='Remember me' />
          </Form.Field>

          <Button type='submit' primary fluid size='small'>
            Submit
          </Button>
        </Form>

        {loginError && (
          <Message error header='Action Forbidden' content={loginError} />
        )}

        <Menu text size='small' inverted={theme !== 'light'}>
          <Link to='/register'>
            <Menu.Item name='register' />
          </Link>
        </Menu>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
