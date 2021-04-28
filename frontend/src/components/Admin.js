import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { _get_stats } from '../store/user';

import AdminPosts from './component/AdminPosts';
import AdminUsers from './component/AdminUsers';
import AdminComments from './component/AdminComments';

import Logo from './component/Logo';
import Menu from './component/Menu';

const Admin = ({ history }) => {
  const { data: loginData } = useSelector((state) => state.user.login);

  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  const [showUsers, setShowUsers] = React.useState(true);
  const [showPosts, setShowPosts] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);

  const showUsersHandler = () => {
    setShowComments(false);
    setShowPosts(false);
    setShowUsers(!showUsers);
  };
  const showPostsHandler = () => {
    setShowUsers(false);
    setShowComments(false);
    setShowPosts(!showPosts);
  };
  const showCommentsHandler = () => {
    setShowUsers(false);
    setShowPosts(false);
    setShowComments(!showPosts);
  };

  React.useEffect(() => {
    if (!loginData?.isAdmin) history.push('/');

    (async () => {
      const result = await dispatch(_get_stats());
      setData(result);
    })();
  }, [history, loginData, dispatch]);

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
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Posts</th>
              <th>Users</th>
              <th>Comments</th>
              <th>Pm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TOTAL:</td>
              <td>{data && data.posts.length}</td>
              <td>{data && data.users.length}</td>
              <td>{data && data.comments.length}</td>
              <td>{data && data.pms.length}</td>
            </tr>
          </tbody>
        </table>
        {/*  */}
        <>
          <button className='App-btn-primary' onClick={showUsersHandler}>
            users
          </button>
          <button className='App-btn-secondary' onClick={showPostsHandler}>
            posts
          </button>
          <button className='App-btn-secondary' onClick={showCommentsHandler}>
            comments
          </button>
          {showUsers && <AdminUsers users={data.users} />}
          {showPosts && <AdminPosts posts={data.posts} />}
          {showComments && <AdminComments comments={data.comments} />}
        </>
      </Col>
    </Row>
  );
};

export default Admin;
