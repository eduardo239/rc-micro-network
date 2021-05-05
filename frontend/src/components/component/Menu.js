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

  const themeHandler = () => {
    if (ui === 'light') dispatch(darkTheme());
    else dispatch(lightTheme());
  };

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const { activeItem } = state;
  return (
    <div
      className={`App-menu ${ui === 'light' ? 'App-bg-light' : 'App-bg-dark'}`}
    >
      <Menu secondary vertical fluid>
        <Link to='/'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
        </Link>

        {!loginData && (
          <Link to='/register'>
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
            />
          </Link>
        )}

        {!loginData && (
          <Link to='/login'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
            />
          </Link>
        )}

        {loginData && (
          <Link to={`/profile/${loginData._id}`}>
            <Menu.Item
              name='profile'
              active={activeItem === 'profile'}
              onClick={handleItemClick}
            />
          </Link>
        )}

        {loginData && loginData.isAdmin && (
          <Link to='/admin'>
            <Menu.Item
              name='admin'
              active={activeItem === 'admin'}
              onClick={handleItemClick}
            />
          </Link>
        )}

        {loginData && (
          <Link to='/settings'>
            <Menu.Item
              name='settings'
              active={activeItem === 'settings'}
              onClick={handleItemClick}
            />
          </Link>
        )}

        {loginData && (
          <Menu.Item name='logout' onClick={() => dispatch(user_logout())} />
        )}

        <Menu.Item name='theme' onClick={themeHandler} />
      </Menu>
    </div>
  );
};

export default Menu2;
