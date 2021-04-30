import React from 'react';

// import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import styles from './css/Register.module.css';

import Input from './form/Input';
import Button from './form/Button';
import Menu from './component/Menu';
import Logo from './component/Logo';
import { useSelector, useDispatch } from 'react-redux';
import { user_update } from '../store/user';

const Settings = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
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
    <Row className='justify-content-center'>
      <Col xs={12} md={3}>
        <Row className='justify-content-between'>
          <Col>
            <Logo />
          </Col>
        </Row>
        <Menu />
      </Col>
      <Col xs={12} md={5}>
        {loginData && (
          <form onSubmit={updateHandler} className={styles.Form}>
            <h2>UPDATE</h2>
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

            <Button>UPDATE</Button>
            {message && (
              <p className='App-message App-message-error'>{message}</p>
            )}
          </form>
        )}
      </Col>
    </Row>
  );
};

export default Settings;
