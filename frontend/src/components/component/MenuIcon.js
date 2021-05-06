import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import { darkTheme, lightTheme } from '../../store/ui';
import { user_logout } from '../../store/user';

const MenuIcon = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({ activeItem: 'home' });
  const { ui: theme } = useSelector((state) => state);
  const { data: loginData } = useSelector((state) => state.user.login);

  const handleItemClick = (e, { name }) => setState({ activeItem: name });
  const themeHandler = () =>
    theme === 'light' ? dispatch(darkTheme()) : dispatch(lightTheme());

  return (
    <Menu icon inverted={theme !== 'light'}>
      <Menu.Item
        as={Link}
        to='/'
        name='home'
        active={state.activeItem === 'home'}
        onClick={handleItemClick}
      >
        <Icon name='home' />
      </Menu.Item>

      {!loginData && (
        <Menu.Item
          as={Link}
          to='/login'
          name='sign-in'
          active={state.activeItem === 'sign-in'}
          onClick={handleItemClick}
        >
          <Icon name='sign-in' />
        </Menu.Item>
      )}

      {!loginData && (
        <Menu.Item
          as={Link}
          to='/register'
          name='register'
          active={state.activeItem === 'register'}
          onClick={handleItemClick}
        >
          <Icon name='address book outline' />
        </Menu.Item>
      )}

      {loginData && (
        <Menu.Item
          as={Link}
          to={`/profile/${loginData._id}`}
          name='user'
          active={state.activeItem === 'user'}
          onClick={handleItemClick}
        >
          <Icon name='user' />
        </Menu.Item>
      )}

      {loginData && (
        <Menu.Item
          as={Link}
          to='/settings'
          name='setting'
          active={state.activeItem === 'setting'}
          onClick={handleItemClick}
        >
          <Icon name='setting' />
        </Menu.Item>
      )}

      <Menu.Item
        name='moon'
        active={state.activeItem === 'moon'}
        onClick={themeHandler}
      >
        <Icon name='moon' />
      </Menu.Item>

      {loginData && (
        <Menu.Item
          name='sign-out'
          active={state.activeItem === 'sign-out'}
          onClick={() => dispatch(user_logout())}
        >
          <Icon name='sign-out' />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default MenuIcon;
