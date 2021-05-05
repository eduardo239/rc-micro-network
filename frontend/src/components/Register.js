import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { user_register } from '../store/user';
import { Button, Checkbox, Form, Grid, Menu, Message } from 'semantic-ui-react';

import MenuLogin from './component/MenuLogin';

const Register = ({ history }) => {
  /*eslint-disable-next-line*/
  const [agree, setAgree] = React.useState(false);
  const [email, setEmail] = React.useState('admin@email.com');
  const [name, setName] = React.useState('Admin');
  const [password, setPassword] = React.useState('123');
  const [passwordAgain, setPasswordAgain] = React.useState('123');
  /*eslint-disable-next-line*/
  const [message, setMessage] = React.useState('');

  const { data: loginData } = useSelector((state) => state.user.login);
  const { error: registerError, loading: registerLoading } = useSelector(
    (state) => state.user.register
  );

  const dispatch = useDispatch();

  const registerHandler = (e) => {
    setMessage('');
    e.preventDefault();
    if (!agree) {
      if (password === passwordAgain) {
        dispatch(user_register({ email, name, password }));
      } else {
        setMessage('Password do not match.');
      }
    } else {
      setMessage('You have to agree with the terms.');
    }
  };

  React.useEffect(() => {
    if (loginData && !registerError) history.push('/');
  }, [loginData, history, registerError]);

  return (
    <Grid centered doubling stackable>
      <Grid.Column width={5}>
        <MenuLogin />
        <h2>Register</h2>

        <Form
          onSubmit={registerHandler}
          loading={registerLoading ? true : null}
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
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>

          <Button type='submit' primary fluid size='small'>
            Submit
          </Button>
        </Form>

        {registerError && (
          <Message error header='Action Forbidden' content={registerError} />
        )}

        <Menu text>
          <Link to='/login'>
            <Menu.Item name='login' />
          </Link>
        </Menu>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
