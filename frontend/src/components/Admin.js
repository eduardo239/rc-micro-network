import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
//import { get_posts } from '../store/post';
//import { get_users } from '../store/user';

import Logo from './component/Logo';
import Menu from './component/Menu';

const Admin = ({ history }) => {
  const { data: loginData } = useSelector((state) => state.user.login);
  const { data: postsData } = useSelector((state) => state.post.posts);

  //  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!loginData?.isAdmin) history.push('/');
  }, [history, loginData]);

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={2}>
        <Row className='justify-content-between'>
          <Col>
            <Logo />
          </Col>
        </Row>
        <Menu />
      </Col>
      <Col xs={12} md={5}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Posts</th>
              <th>Users</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TOTAL:</td>
              <td>{postsData && postsData.length}</td>
              <td>342433</td>
              <td>34643</td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  );
};

export default Admin;
