import React from 'react';
import { ReactComponent as LogoIcon } from '../../assets/img/micro_network.svg';
// import { ReactComponent as LogoIconMini } from '../../assets/img/micro_network_mini.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Logo = () => {
  const { ui: theme } = useSelector((state) => state);

  return (
    <Link to='/'>
      <LogoIcon
        className={`App-logo ${
          theme === 'light' ? 'App-logo-light' : 'App-logo-dark'
        }`}
      />
    </Link>
  );
};

export default Logo;
