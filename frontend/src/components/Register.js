import React from 'react';

import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import Input from './form/Input';
import Button from './form/Button';

import styles from './css/Register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { user_register } from '../store/user';
import MenuLogin from './component/MenuLogin';

const Register = ({ history }) => {
  const [email, setEmail] = React.useState('admin@email.com');
  const [name, setName] = React.useState('Admin');
  const [password, setPassword] = React.useState('123');
  const [passwordAgain, setPasswordAgain] = React.useState('123');
  const [message, setMessage] = React.useState('');

  const { data: loginData } = useSelector((state) => state.user.login);
  const { error: registerError } = useSelector((state) => state.user.register);

  const dispatch = useDispatch();

  const registerHandler = (e) => {
    setMessage('');
    e.preventDefault();
    if (password === passwordAgain) {
      dispatch(user_register({ email, name, password }));
    } else {
      setMessage('Password do not match.');
    }
  };

  React.useEffect(() => {
    if (loginData && !registerError) history.push('/');
  }, [loginData, history, registerError]);

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={4}>
        <MenuLogin />
        <form
          onSubmit={registerHandler}
          className={`App-border ${styles.Form}`}
        >
          <h2>REGISTER</h2>
          <Input
            label='email'
            type='email'
            name='loginEmail'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />

          <Input
            label='name'
            type='text'
            name='loginName'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />

          <Input
            label='password'
            type='password'
            name='loginPassword'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <Input
            label='password again'
            type='password'
            name='loginPasswordAgain'
            value={passwordAgain}
            onChange={({ target }) => setPasswordAgain(target.value)}
          />

          <Button>REGISTER</Button>
          {registerError ||
            (message && (
              <p className='App-message App-message-error'>
                {registerError || message}
              </p>
            ))}

          <Link className='small' to='/login'>
            Sign in
          </Link>
        </form>
      </Col>
    </Row>
  );
};

export default Register;
