import { combineReducers } from '@reduxjs/toolkit';
import createAsyncSlice from './helpers/createAsyncSlice';
import getLocalStorage from './helpers/getLocalStorage';

const _token = createAsyncSlice({
  name: 'token',
  fetchConfig: (body) => ({
    url: `http://localhost:5000/api/users/login`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  }),
});

const _login = createAsyncSlice({
  name: 'login',
  fetchConfig: (token) => ({
    url: `http://localhost:5000/api/users/profile`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  }),
});

const _register = createAsyncSlice({
  name: 'register',
  reducers: {
    resetRegister(state) {
      state.data = [];
    },
  },
  fetchConfig: (user) => ({
    url: `http://localhost:5000/api/users`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  }),
});

const _update = createAsyncSlice({
  name: 'update',
  fetchConfig: (user) => ({
    url: `http://localhost:5000/api/users/profile`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(
          window.localStorage.getItem('token')
        )}`,
      },
      body: JSON.stringify(user),
    },
  }),
});

const _delete = createAsyncSlice({
  name: 'delete',
  fetchConfig: (id) => ({
    url: `http://localhost:5000/api/users/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getLocalStorage('token')}`,
      },
    },
  }),
});

const _posts = createAsyncSlice({
  name: 'post',
  fetchConfig: (id) => ({
    url: `http://localhost:5000/api/users/posts/${id}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getLocalStorage('token')}`,
      },
    },
  }),
});

const _friend = createAsyncSlice({
  name: 'friend',
  fetchConfig: (body) => ({
    url: `http://localhost:5000/api/friends`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getLocalStorage('token')}`,
      },
      body: JSON.stringify(body),
    },
  }),
});

const _friend_remove = createAsyncSlice({
  name: 'friend',
  fetchConfig: (body) => ({
    url: `http://localhost:5000/api/friends`,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getLocalStorage('token')}`,
      },
      body: JSON.stringify(body),
    },
  }),
});

const _by_id = createAsyncSlice({
  name: 'user',
  fetchConfig: (id) => ({
    url: `http://localhost:5000/api/users/${id}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getLocalStorage('token')}`,
      },
    },
  }),
});

const _users = createAsyncSlice({
  name: 'users',
  fetchConfig: () => ({
    url: `http://localhost:5000/api/users`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getLocalStorage('token')}`,
      },
    },
  }),
});

const __stats = createAsyncSlice({
  name: 'stats',
  fetchConfig: () => ({
    url: `http://localhost:5000/api/admin/stats`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getLocalStorage('token')}`,
      },
    },
  }),
});

const reducer = combineReducers({
  token: _token.reducer,
  login: _login.reducer,
  register: _register.reducer,
  posts: _posts.reducer,
  user: _by_id.reducer,
  __delete: _delete.reducer,
  __stats: __stats.reducer,
});

const tokenAction = _token.asyncAction;
const userAction = _login.asyncAction;
const registerAction = _register.asyncAction;
const updateAction = _update.asyncAction;
const deleteAction = _delete.asyncAction;
const postsAction = _posts.asyncAction;
const addFriendAction = _friend.asyncAction;
const deleteFriendAction = _friend_remove.asyncAction;
const userByAction = _by_id.asyncAction;
const usersAction = _users.asyncAction;
const statsAction = __stats.asyncAction;

const { resetState: resetTokenState } = _token.actions;
const { resetState: resetLoginState } = _login.actions;
const { resetState: resetUserState } = _users.actions;
const { resetState: resetRegister } = _register.actions;

export default reducer;

// get user token
export const getToken = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(tokenAction(user));
    window.localStorage.setItem('token', JSON.stringify(payload.token));
    await dispatch(userLogin(payload.token));
  } catch (error) {
    console.error(error);
    dispatch(resetUserState());
    dispatch(resetTokenState());
    dispatch(resetLoginState());
  }
};

// get user profile
export const userLogin = (token) => async (dispatch) => {
  try {
    await dispatch(userAction(token));
  } catch (error) {
    console.error(error);
    dispatch(resetUserState());
    dispatch(resetTokenState());
    dispatch(resetLoginState());
  }
};

// auto login
export const autoLogin = () => async (dispatch) => {
  const token = getLocalStorage('token');
  if (token) {
    await dispatch(userLogin(token));
  }
  try {
  } catch (error) {
    dispatch(resetUserState());
    dispatch(resetTokenState());
    dispatch(resetLoginState());
    console.error(error);
  }
};

// user logout
export const userLogout = () => (dispatch) => {
  try {
    dispatch(resetUserState());
    dispatch(resetTokenState());
    dispatch(resetRegister());
    dispatch(resetLoginState());
    window.localStorage.removeItem('token');
  } catch (error) {
    console.error(error);
  }
};

// user register
export const userRegister = (body) => async (dispatch) => {
  try {
    await dispatch(registerAction(body));
    await dispatch(getToken(body));
  } catch (error) {
    console.error(error);
  }
};

// user update profile
export const userUpdate = (userUpdate) => async (dispatch) => {
  try {
    const { payload } = await dispatch(updateAction(userUpdate));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// delete user from social network
export const userDelete = (id) => async (dispatch) => {
  try {
    const { payload } = await dispatch(deleteAction(id));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// get posts by user
export const postsById = (id) => async (dispatch) => {
  try {
    const { payload } = await dispatch(postsAction(id));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// new friend
export const addFriend = (body) => async (dispatch) => {
  try {
    const { payload } = await dispatch(addFriendAction(body));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// remove friend
export const removeFriend = (body) => async (dispatch) => {
  try {
    const { payload } = await dispatch(deleteFriendAction(body));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// get users by id
export const getUserById = (id) => async (dispatch) => {
  try {
    const { payload } = await dispatch(userByAction(id));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// get users
export const getUsers = () => async (dispatch) => {
  try {
    const { payload } = await dispatch(usersAction());
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// _get stats admin
export const getStats = () => async (dispatch) => {
  try {
    const { payload } = await dispatch(statsAction());
    return payload;
  } catch (error) {
    console.error(error);
  }
};
