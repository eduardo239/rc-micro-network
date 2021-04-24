import React from 'react';

import { Route, Switch } from 'react-router';
import { GlobalStyle } from './css/global';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './css/theme';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { auto_login } from './store/user';

import Home from './components/Home';
import Post from './components/Post';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Settings from './components/Settings';
import { get_posts } from './store/post';

const App = () => {
  const { ui: theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const f = async () => {
      await dispatch(auto_login());
      await dispatch(get_posts());
    };
    f();
  }, [dispatch]);

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
              {/* 
              <Route exact path='/search/:term' component={SearchResults} />*/}
              {/* <Route exact path='/admin' component={Admin} />  */}
            </Switch>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default App;
