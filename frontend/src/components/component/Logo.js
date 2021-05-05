import React from 'react';
import { ReactComponent as LogoIcon } from '../../assets/img/micro_network.svg';
// import { ReactComponent as LogoIconMini } from '../../assets/img/micro_network_mini.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/'>
      <LogoIcon className='App-logo' />
    </Link>
  );
};

export default Logo;
