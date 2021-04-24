import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../store/ui';
import { user_logout } from '../../store/user';

import { ReactComponent as HomeIcon } from '../../assets/ico/white/carbon_home.svg';
import { ReactComponent as SettingsIcon } from '../../assets/ico/white/carbon_settings.svg';
import { ReactComponent as ProfileIcon } from '../../assets/ico/white/carbon_user.svg';
import { ReactComponent as LogoutIcon } from '../../assets/ico/white/carbon_logout.svg';
import { ReactComponent as LoginIcon } from '../../assets/ico/white/carbon_login.svg';
import { ReactComponent as RegisterIcon } from '../../assets/ico/white/carbon_user-follow.svg';
import { ReactComponent as ThemeIcon } from '../../assets/ico/white/carbon_asleep.svg';

const Menu = () => {
  const dispatch = useDispatch();

  const { ui } = useSelector((state) => state);

  const { data: loginData } = useSelector((state) => state.user.login);

  const themeHandler = () => {
    if (ui === 'light') dispatch(darkTheme());
    else dispatch(lightTheme());
  };

  return (
    <nav
      className={`App-menu ${ui === 'light' ? 'App-bg-light' : 'App-bg-dark'}`}
    >
      <li>
        <Link to='/'>
          <span>
            <HomeIcon /> Home
          </span>
        </Link>
      </li>
      {!loginData && (
        <li>
          <Link to='/register'>
            <span>
              <RegisterIcon /> Register
            </span>
          </Link>
        </li>
      )}
      {!loginData && (
        <li>
          <Link to='/login'>
            <span>
              <LoginIcon /> Login
            </span>
          </Link>
        </li>
      )}

      {loginData && (
        <li>
          <Link to={`/profile/${loginData._id}`}>
            <span>
              <ProfileIcon /> @{loginData.name}
            </span>
          </Link>
        </li>
      )}
      {loginData && loginData.isAdmin && (
        <li>
          <Link to='/profile'>
            <span>
              <ProfileIcon /> Admin Control
            </span>
          </Link>
        </li>
      )}

      {loginData && (
        <li>
          <Link to='/settings'>
            <span>
              <SettingsIcon /> Settings
            </span>
          </Link>
        </li>
      )}

      <li>
        <button className='App-link' onClick={themeHandler}>
          <ThemeIcon /> Theme
        </button>
      </li>

      {loginData && (
        <li>
          <button className='App-link' onClick={() => dispatch(user_logout())}>
            <LogoutIcon /> Logout
          </button>
        </li>
      )}
    </nav>
  );
};

export default Menu;
