import React from 'react';

import { Table, Grid } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { _get_stats } from '../store/user';

// import AdminPosts from './component/AdminPosts';
// import AdminUsers from './component/AdminUsers';
// import AdminComments from './component/AdminComments';
import Logo from './component/Logo';
import Menu from './component/Menu';

const Admin = ({ history }) => {
  const { data: loginData } = useSelector((state) => state.user.login);

  const dispatch = useDispatch();
  const [data, setData] = React.useState('');
  // const [showUsers, setShowUsers] = React.useState(true);
  // const [showPosts, setShowPosts] = React.useState(false);
  // const [showComments, setShowComments] = React.useState(false);

  // const showUsersHandler = () => {
  //   setShowComments(false);
  //   setShowPosts(false);
  //   setShowUsers(!showUsers);
  // };
  // const showPostsHandler = () => {
  //   setShowUsers(false);
  //   setShowComments(false);
  //   setShowPosts(!showPosts);
  // };
  // const showCommentsHandler = () => {
  //   setShowUsers(false);
  //   setShowPosts(false);
  //   setShowComments(!showPosts);
  // };

  React.useEffect(() => {
    if (!loginData?.isAdmin) history.push('/');

    (async () => {
      const result = await dispatch(_get_stats());
      setData(result);
    })();
  }, [history, loginData, dispatch]);

  return (
    <Grid centered>
      <Grid.Column width={3}>
        <Logo />
        <Menu />
      </Grid.Column>
      <Grid.Column width={7}>
        <Table celled>
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
