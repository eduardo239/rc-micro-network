import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { get_user_by_id } from '../store/user';
import { Grid } from 'semantic-ui-react';

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
    let mounted = true;
    if (mounted) {
      if (id) dispatch(get_user_by_id(id));
    }

    return () => (mounted = false);
  }, [dispatch, id]);

  return (
    <Grid centered doubling stackable>
      <Grid.Column width={3}>
        <Logo />
        <Menu />
      </Grid.Column>
      <Grid.Column width={7}>
        {userData && loginData && (
          <>
            <ProfileHeader user={userData} login={loginData} />
            <ProfileContent user={userData} login={loginData} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Profile;
