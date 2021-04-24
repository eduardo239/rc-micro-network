import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Logo from './component/Logo';
import PostNew from './component/PostNew';
import Menu from './component/Menu';
import User from './component/User';
import Feed from './Feed';
import Modal from './Modal';
import Search from './component/Search';

const Home = () => {
  const modal = useSelector((state) => state.modal);
  const { data: loginData } = useSelector((state) => state.user.login);

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={2}>
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
        <Search />
        <PostNew />
        <Feed />
        {modal && <Modal />}
      </Col>
    </Row>
  );
};

export default Home;
