import { combineReducers } from '@reduxjs/toolkit';
import createAsyncSlice from './helpers/createAsyncSlice';
import getLocalStorage from './helpers/getLocalStorage';
import get_local_storage from './helpers/getLocalStorage';

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
        Authorization: `Bearer ${get_local_storage('token')}`,
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
        Authorization: `Bearer ${get_local_storage('token')}`,
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
        Authorization: `Bearer ${get_local_storage('token')}`,
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
        Authorization: `Bearer ${get_local_storage('token')}`,
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
        Authorization: `Bearer ${get_local_storage('token')}`,
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
        Authorization: `Bearer ${get_local_storage('token')}`,
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
        Authorization: `Bearer ${get_local_storage('token')}`,
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

const fetch_token = _token.asyncAction;
const fetch_user = _login.asyncAction;
const fetch_register = _register.asyncAction;
const fetch_update = _update.asyncAction;
const fetch_delete = _delete.asyncAction;
const fetch_posts = _posts.asyncAction;
const fetch_add_friend = _friend.asyncAction;
const fetch_remove_friend = _friend_remove.asyncAction;
const fetch_user_by_id = _by_id.asyncAction;
const fetch_users = _users.asyncAction;
const _fetch_stats = __stats.asyncAction;

const { resetState: resetTokenState } = _token.actions;
const { resetState: resetUserState } = _login.actions;
const { resetRegister } = _register.actions;

export default reducer;

// get user token
export const get_token = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetch_token(user));
    window.localStorage.setItem('token', JSON.stringify(payload.token));
    await dispatch(user_login(payload.token));
  } catch (error) {
    console.error(error);
  }
};

// get user profile
export const user_login = (token) => async (dispatch) => {
  try {
    await dispatch(fetch_user(token));
  } catch (error) {
    console.error(error);
  }
};

// auto login
export const auto_login = () => async (dispatch) => {
  const token = getLocalStorage('token');
  if (token) {
    await dispatch(user_login(token));
  }
  try {
  } catch (error) {
    dispatch(resetUserState());
    dispatch(resetTokenState());
    console.error(error);
  }
};

// user logout
export const user_logout = () => (dispatch) => {
  try {
    dispatch(resetUserState());
    dispatch(resetTokenState());
    dispatch(resetRegister());
    window.localStorage.removeItem('token');
  } catch (error) {
    console.error(error);
  }
};

// user register
export const user_register = (body) => async (dispatch) => {
  try {
    await dispatch(fetch_register(body));
    await dispatch(get_token(body));
  } catch (error) {
    console.error(error);
  }
};

// user update profile
export const user_update = (userUpdate) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetch_update(userUpdate));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// delete user from social network
export const delete_user = (id) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetch_delete(id));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// get posts by user
export const get_posts_by = (id) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetch_posts(id));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// new friend
export const add_friend = (body) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetch_add_friend(body));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// new friend
export const remove_friend = (body) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetch_remove_friend(body));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// get users by id
export const get_user_by_id = (id) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetch_user_by_id(id));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// get users
export const get_users = () => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetch_users());
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// _get stats admin
export const _get_stats = () => async (dispatch) => {
  try {
    const { payload } = await dispatch(_fetch_stats());
    return payload;
  } catch (error) {
    console.error(error);
  }
};
