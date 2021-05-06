import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { user_register } from '../store/user';
import { Button, Checkbox, Form, Grid, Menu, Message } from 'semantic-ui-react';
import MenuIcon from './component/MenuIcon';

const Register = ({ history }) => {
  const [agree, setAgree] = React.useState(false);
  const [email, setEmail] = React.useState('admin@email.com');
  const [name, setName] = React.useState('Admin');
  const [password, setPassword] = React.useState('123');
  const [passwordAgain, setPasswordAgain] = React.useState('123');
  const [message, setMessage] = React.useState('');

  const { ui: theme } = useSelector((state) => state);
  const { data: loginData } = useSelector((state) => state.user.login);
  const { error: rError, loading: rLoading } = useSelector(
    (state) => state.user.register
  );

  const dispatch = useDispatch();

  const registerHandler = (e) => {
    console.log(agree);
    e.preventDefault();
    setMessage('');
    if (agree && password === passwordAgain)
      dispatch(user_register({ email, name, password }));
    if (password !== passwordAgain) setMessage('Password do not match.');
    if (!agree) setMessage('You have to agree with the terms.');
  };
  const checkHandler = (e) => setAgree((prev) => !agree);

  React.useEffect(() => {
    if (loginData && !rError) history.push('/');
  }, [loginData, history, rError]);

  return (
    <Grid centered doubling stackable>
      <Grid.Column width={6}>
        <MenuIcon />
        <h2>Register</h2>

        <Form
          inverted={theme !== 'light'}
          onSubmit={registerHandler}
          loading={rLoading ? true : null}
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

          <Form.Field>
            <Checkbox
              onChange={checkHandler}
              value={agree}
              label='I agree to the Terms and Conditions'
            />
          </Form.Field>

          <Button type='submit' primary fluid size='small'>
            Submit
          </Button>
        </Form>

        {rError && <Message error header='Action Forbidden' content={rError} />}
        {message && (
          <Message error header='Action Forbidden' content={message} />
        )}

        <Menu text inverted={theme !== 'light'}>
          <Link to='/login'>
            <Menu.Item name='login' />
          </Link>
        </Menu>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
