import React from 'react';

import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../store/ui';
import { user_logout } from '../../store/user';

const Menu2 = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({ activeItem: 'home' });

  const { ui } = useSelector((state) => state);
  const { data: loginData } = useSelector((state) => state.user.login);

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const themeHandler = () =>
    ui === 'light' ? dispatch(darkTheme()) : dispatch(lightTheme());

  return (
    <Menu pointing vertical fluid inverted={ui !== 'light'}>
      <Menu.Item
        as={Link}
        to='/'
        name='home'
        active={state.activeItem === 'home'}
        onClick={handleItemClick}
      />

      {!loginData && (
        <Menu.Item
          as={Link}
          to='/register'
          name='register'
          active={state.activeItem === 'register'}
          onClick={handleItemClick}
        />
      )}

      {!loginData && (
        <Menu.Item
          as={Link}
          to='/login'
          name='login'
          active={state.activeItem === 'login'}
          onClick={handleItemClick}
        />
      )}

      {loginData && (
        <Menu.Item
          as={Link}
          to={`/profile/${loginData._id}`}
          name='profile'
          active={state.activeItem === 'profile'}
          onClick={handleItemClick}
        />
      )}

      {loginData && loginData.isAdmin && (
        <Menu.Item
          as={Link}
          to='/admin'
          name='admin'
          active={state.activeItem === 'admin'}
          onClick={handleItemClick}
        />
      )}

      {loginData && (
        <Menu.Item
          as={Link}
          to='/settings'
          name='settings'
          active={state.activeItem === 'settings'}
          onClick={handleItemClick}
        />
      )}

      {loginData && (
        <Menu.Item
          name='logout'
          active={state.activeItem === 'logout'}
          onClick={() => dispatch(user_logout())}
        />
      )}

      <Menu.Item
        name='theme'
        active={state.activeItem === 'theme'}
        onClick={themeHandler}
      />
    </Menu>
  );
};

export default Menu2;
