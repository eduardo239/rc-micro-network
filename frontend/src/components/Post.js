import React from 'react';

import { Col, Row } from 'react-bootstrap';
import Logo from './component/Logo';

import Menu from './component/Menu';
import User from './component/User';

import styles from './css/Post.module.css';

const post = {
  image:
    'https://i.picsum.photos/id/505/400/400.jpg?hmac=_lueMWvtmQj3sBLsJvYyONnOMPKmKxYv4KOx-3nx8mA',
  content: 'lorem ipsum',
};

const Post = () => {
  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={2}>
        <Logo />
        <User />
        <Menu />
      </Col>
      <Col xs={12} md={5}>
        <div className={styles.Post}>
          <div className={styles.Modal}>
            <img src={post.image} alt='' />
            <p>{post.content}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Post;
