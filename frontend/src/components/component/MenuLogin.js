import React from 'react';

import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const MenuLogin = () => {
  return (
    <Menu fluid>
      <Link to='/'>
        <Menu.Item name='home' />
      </Link>
      <Link to='/register'>
        <Menu.Item name='register' />
      </Link>
      <Link to='/login'>
        <Menu.Item name='login' />
      </Link>
    </Menu>
  );
};

export default MenuLogin;
