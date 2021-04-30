import React from 'react';

import { Link } from 'react-router-dom';

import { ReactComponent as HomeIcon } from '../../assets/ico/white/carbon_home.svg';
import { ReactComponent as LoginIcon } from '../../assets/ico/white/carbon_login.svg';
import { ReactComponent as RegisterIcon } from '../../assets/ico/white/carbon_user-follow.svg';

const MenuLogin = () => {
  return (
    <ul className='App-menu-login'>
      <li>
        <Link to='/'>
          <span>
            <HomeIcon />
            <span className='App-menu-item'>Home</span>
          </span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <span>
            <LoginIcon />
            <span className='App-menu-item'>Login</span>
          </span>
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <span>
            <RegisterIcon />
            <span className='App-menu-item'>Register</span>
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default MenuLogin;
