import React from 'react';

import { Route, Switch, useLocation } from 'react-router';
import { GlobalStyle } from './css/global';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './css/theme';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { autoLogin } from './store/user';
import { closeModal } from './store/modal';

import Home from './components/Home';
import Post from './components/Post';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Admin from './components/Admin';

const App = () => {
  const modal = useSelector((state) => state.modal.post_modal);
  const { ui: theme } = useSelector((state) => state);
  const { data: loginData } = useSelector((state) => state.user.login);

  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location.pathname !== '/' && modal) dispatch(closeModal());

    (async () => {
      if (!loginData) await dispatch(autoLogin());
    })();
  }, [dispatch, location, modal, loginData]);

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
              <Route path='/post/:id' component={Post} />
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
