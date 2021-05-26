import React from 'react';

import { Table, Grid } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { getStats } from '../store/user';

// import AdminPosts from './component/AdminPosts';
// import AdminUsers from './component/AdminUsers';
// import AdminComments from './component/AdminComments';
import Logo from './component/Logo';
import Menu from './component/Menu';
import MenuIcon from './component/MenuIcon';

const Admin = ({ history }) => {
  const { data: loginData } = useSelector((state) => state.user.login);
  const { ui: theme } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    if (!loginData?.isAdmin) history.push('/');

    (async () => {
      const result = await dispatch(getStats());
      setData(result);
    })();
  }, [history, loginData, dispatch]);

  return (
    <Grid centered>
      <Grid.Column width={3} only='tablet computer'>
        <Logo />
        <Menu />
      </Grid.Column>
      <Grid.Column width={3} only='mobile'>
        <MenuIcon />
      </Grid.Column>
      <Grid.Column width={7}>
        <br />
        <br />
        {/* TODO */}
        <Table celled inverted={theme !== 'light'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Users</Table.HeaderCell>
              <Table.HeaderCell>Posts</Table.HeaderCell>
              <Table.HeaderCell>Comments</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {/* <Label ribbon>First</Label> */}
                {data && data.users.length}
              </Table.Cell>
              <Table.Cell>{data && data.posts.length}</Table.Cell>
              <Table.Cell>{data && data.comments.length}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  );
};

export default Admin;
