import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
const MenuIcon = () => {
  const [state, setState] = React.useState({ activeItem: 'gamepad' });
  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  return (
    <Menu icon>
      <Menu.Item
        name='home'
        active={state.activeItem === 'home'}
        onClick={handleItemClick}
      >
        <Icon name='home' />
      </Menu.Item>

      <Menu.Item
        name='sign-in'
        active={state.activeItem === 'sign-in'}
        onClick={handleItemClick}
      >
        <Icon name='sign-in' />
      </Menu.Item>

      <Menu.Item
        name='user'
        active={state.activeItem === 'user'}
        onClick={handleItemClick}
      >
        <Icon name='user' />
      </Menu.Item>

      <Menu.Item
        name='setting'
        active={state.activeItem === 'setting'}
        onClick={handleItemClick}
      >
        <Icon name='setting' />
      </Menu.Item>

      <Menu.Item
        name='moon'
        active={state.activeItem === 'moon'}
        onClick={handleItemClick}
      >
        <Icon name='moon' />
      </Menu.Item>

      <Menu.Item
        name='sign-out'
        active={state.activeItem === 'sign-out'}
        onClick={handleItemClick}
      >
        <Icon name='sign-out' />
      </Menu.Item>
    </Menu>
  );
};

export default MenuIcon;
