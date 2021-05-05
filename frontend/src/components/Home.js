import React from 'react';

import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Logo from './component/Logo';
import PostNew from './component/PostNew';
import Menu from './component/Menu';
import Feed from './Feed';
import Modal from './Modal';
import Search from './component/Search';
import MenuIcon from './component/MenuIcon';

const Home = () => {
  const modal = useSelector((state) => state.modal.post_modal);

  return (
    <Grid centered doubling stackable>
      <Grid.Column width={3}>
        <Logo />
        <Menu />
      </Grid.Column>
      <Grid.Column width={7}>
        <MenuIcon />
        <Search />
        <PostNew />
        <Feed />
        {modal && <Modal />}
      </Grid.Column>
    </Grid>
  );
};

export default Home;
