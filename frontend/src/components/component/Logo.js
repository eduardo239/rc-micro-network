import React from 'react';
import { ReactComponent as LogoIcon } from '../../assets/img/micro_network.svg';
import { ReactComponent as LogoIconMini } from '../../assets/img/micro_network_mini.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className='App-logo'>
      <Link to='/'>{false ? <LogoIcon /> : <LogoIconMini />}</Link>
    </div>
  );
};

export default Logo;
