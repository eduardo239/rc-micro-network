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
import { ReactComponent as NightIcon } from '../../assets/ico/white/carbon_asleep.svg';
import { ReactComponent as DayIcon } from '../../assets/ico/white/carbon_sun.svg';

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
            <HomeIcon />
            <span className='App-menu-item'>Home</span>
          </span>
        </Link>
      </li>
      {!loginData && (
        <li>
          <Link to='/register'>
            <span>
              <RegisterIcon />
              <span className='App-menu-item'>Register</span>
            </span>
          </Link>
        </li>
      )}
      {!loginData && (
        <li>
          <Link to='/login'>
            <span>
              <LoginIcon />
              <span className='App-menu-item'>Login</span>
            </span>
          </Link>
        </li>
      )}

      {loginData && (
        <li>
          <Link to={`/profile/${loginData._id}`}>
            <span>
              <ProfileIcon />
              <span className='App-menu-item'>{loginData.name}</span>
            </span>
          </Link>
        </li>
      )}
      {loginData && loginData.isAdmin && (
        <li>
          <Link to='/admin'>
            <span>
              <ProfileIcon />
              <span className='App-menu-item'>Control</span>
            </span>
          </Link>
        </li>
      )}

      {loginData && (
        <li>
          <Link to='/settings'>
            <span>
              <SettingsIcon />
              <span className='App-menu-item'>Settings</span>
            </span>
          </Link>
        </li>
      )}

      <li>
        <button className='App-link' onClick={themeHandler}>
          {ui === 'light' ? <NightIcon /> : <DayIcon />}
          <span className='App-menu-item'>Theme</span>
        </button>
      </li>

      {loginData && (
        <li>
          <button className='App-link' onClick={() => dispatch(user_logout())}>
            <LogoutIcon />
            <span className='App-menu-item'>Logout</span>
          </button>
        </li>
      )}
    </nav>
  );
};

export default Menu;
