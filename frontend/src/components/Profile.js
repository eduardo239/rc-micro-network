import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { get_user_by_id } from '../store/user';
import { Grid } from 'semantic-ui-react';

import ProfileContent from './component/ProfileContent';
import ProfileHeader from './component/ProfileHeader';
import Menu from './component/Menu';
import MenuIcon from './component/MenuIcon';
import Logo from './component/Logo';

const Profile = ({ match, history }) => {
  const { data: userData } = useSelector((state) => state.user.user);
  const { data: loginData } = useSelector((state) => state.user.login);

  const dispatch = useDispatch();
  const id = match.params.id;

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (id) dispatch(get_user_by_id(id));
      if (!loginData) history.push('/');
    }

    return () => (mounted = false);
  }, [dispatch, id, history, loginData]);

  return (
    <Grid centered doubling stackable>
      <Grid.Column width={4} only='tablet computer'>
        <Logo />
        <Menu />
      </Grid.Column>
      <Grid.Column width={4} only='mobile'>
        <MenuIcon />
      </Grid.Column>
      <Grid.Column width={8}>
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
