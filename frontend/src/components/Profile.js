import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// import { get_pm } from '../store/comments';
import { get_user_by_id } from '../store/user';

import ProfileContent from './component/ProfileContent';
import ProfileHeader from './component/ProfileHeader';
import Menu from './component/Menu';
import Logo from './component/Logo';

const Profile = ({ match }) => {
  const { data: userData } = useSelector((state) => state.user.user);
  const { data: loginData } = useSelector((state) => state.user.login);

  const dispatch = useDispatch();
  const id = match.params.id;

  React.useEffect(() => {
    if (id) dispatch(get_user_by_id(id));
  }, [dispatch, id, loginData]);

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
        {userData && loginData && (
          <>
            <ProfileHeader user={userData} login={loginData} />
            <ProfileContent user={userData} login={loginData} />
          </>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
