import React from 'react';

// import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import styles from './css/Register.module.css';

import Input from './form/Input';
import Button from './form/Button';
import Menu from './component/Menu';
import User from './component/User';
import Logo from './component/Logo';

const Settings = () => {
  const [email, setEmail] = React.useState('admin@email.com');
  const [name, setName] = React.useState('Admin');
  const [password, setPassword] = React.useState('123');
  const [passwordAgain, setPasswordAgain] = React.useState('123');

  const { data: loginData } = useSelector((state) => state.user.login);

  const updateHandler = (e) => {
    e.preventDefault();
    return;
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={3}>
        <Row className='justify-content-between'>
          <Col>
            <Logo />
          </Col>
          <Col>
            <User user={loginData} />
          </Col>
        </Row>
        <Menu />
      </Col>
      <Col xs={12} md={5}>
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
        </form>
      </Col>
    </Row>
  );
};

export default Settings;
