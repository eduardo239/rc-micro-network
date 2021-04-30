import React from 'react';

import { Route, Switch, useLocation } from 'react-router';
import { GlobalStyle } from './css/global';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './css/theme';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { auto_login } from './store/user';
// import { get_posts, get_posts_pagination } from './store/post';
import { closeModal } from './store/modal';

import Home from './components/Home';
import Post from './components/Post';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Admin from './components/Admin';

const App = () => {
  const { ui: theme } = useSelector((state) => state);
  const modal = useSelector((state) => state.modal.post_modal);

  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location.pathname !== '/' && modal) dispatch(closeModal());

    (async () => {
      await dispatch(auto_login());
    })();
  }, [dispatch, location, modal]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Container>
        <Row className='justify-content-center'>
          <Col>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/post/:postId' component={Post} />
              <Route path='/profile/:id' component={Profile} />
              <Route path='/settings' component={Settings} />
              <Route path='/admin' component={Admin} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default App;
