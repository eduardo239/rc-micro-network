import React from 'react';
import { ReactComponent as LogoIcon } from '../../assets/img/micro_network.svg';
import { ReactComponent as LogoIconMini } from '../../assets/img/micro_network_mini.svg';

const Logo = () => {
  return (
    <div className='App-logo'>{false ? <LogoIcon /> : <LogoIconMini />}</div>
  );
};

export default Logo;
