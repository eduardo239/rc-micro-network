import React from 'react';
import { Grid } from 'semantic-ui-react';
import Logo from './component/Logo';
import Menu from './component/Menu';

const Post = ({ match }) => {
  return (
    <Grid centered doubling stackable>
      <Grid.Column width={3}>
        <Logo />
        <Menu />
      </Grid.Column>
      <Grid.Column width={7}>
        <div>{match && match.params.id}</div>
      </Grid.Column>
    </Grid>
  );
};

export default Post;
