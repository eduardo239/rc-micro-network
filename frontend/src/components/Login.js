import React from 'react';

import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { get_token } from '../store/user';

import styles from './css/Register.module.css';
import MenuLogin from './component/MenuLogin';
import Input from './form/Input';
import Button from './form/Button';

const Login = ({ history }) => {
  const [email, setEmail] = React.useState('admin@email.com');
  const [password, setPassword] = React.useState('123');

  const { data: loginData, error: loginError } = useSelector(
    (state) => state.user.login
  );
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(get_token({ email, password }));
  };

  React.useEffect(() => {
    if (loginData) history.push('/');
  }, [loginData, history]);

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={4}>
        <MenuLogin />

        <form onSubmit={loginHandler} className={`App-border ${styles.Form}`}>
          <h2>LOGIN</h2>
          <Input
            label='email'
            type='email'
            name='loginEmail'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />

          <Input
            label='password'
            type='password'
            name='loginPassword'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <Button>LOGIN</Button>
          {loginError && (
            <p className='App-message App-message-error'>{loginError}</p>
          )}

          <Link className='small' to='/register'>
            Sign up
          </Link>
        </form>
      </Col>
    </Row>
  );
};

export default Login;
