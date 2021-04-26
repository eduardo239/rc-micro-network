import { combineReducers } from '@reduxjs/toolkit';
import createAsyncSlice from './helpers/createAsyncSlice';
import get_local_storage from './helpers/getLocalStorage';

const _new = createAsyncSlice({
  name: 'new',
  fetchConfig: (formData) => ({
    url: `http://localhost:5000/api/posts`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${get_local_storage('token')}`,
      },
      body: formData,
    },
  }),
});

const _posts = createAsyncSlice({
  name: 'posts',
  fetchConfig: () => ({
    url: `http://localhost:5000/api/posts`,
    options: {
      method: 'GET',
    },
  }),
});

const _posts_pagination = createAsyncSlice({
  name: 'posts',
  fetchConfig: ({ skip, limit }) => ({
    url: `http://localhost:5000/api/posts?skip=${skip}&limit=${limit}`,
    options: {
      method: 'GET',
    },
  }),
});

const _post = createAsyncSlice({
  name: 'post',
  fetchConfig: (id) => ({
    url: `http://localhost:5000/api/posts/${id}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${get_local_storage('token')}`,
      },
    },
  }),
});

const _delete = createAsyncSlice({
  name: 'delete',
  fetchConfig: (id) => ({
    url: `http://localhost:5000/api/posts/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${get_local_storage('token')}`,
      },
    },
  }),
});

const _edit = createAsyncSlice({
  name: 'edit',
  fetchConfig: ({ id, content }) => ({
    url: `http://localhost:5000/api/posts/${id}`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${get_local_storage('token')}`,
      },
      body: JSON.stringify({ content }),
    },
  }),
});

const _like = createAsyncSlice({
  name: 'like',
  fetchConfig: (id) => ({
    url: `http://localhost:5000/api/posts/like/${id}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${get_local_storage('token')}`,
      },
    },
  }),
});

const _search = createAsyncSlice({
  name: 'search',
  fetchConfig: (term) => ({
    url: `http://localhost:5000/api/search/${term}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${get_local_storage('token')}`,
      },
    },
  }),
});

const reducer = combineReducers({
  new: _new.reducer,
  posts: _posts.reducer,
  post: _post.reducer,
  delete: _delete.reducer,
  search: _search.reducer,
  pagination: _posts_pagination.reducer,
  edit: _edit.reducer,
});

const fetch_new_post = _new.asyncAction;
const fetch_posts = _posts.asyncAction;
const fetch_post = _post.asyncAction;
const fetch_like = _like.asyncAction;
const fetch_delete = _delete.asyncAction;
const fetch_search = _search.asyncAction;
const fetch_pagination = _posts_pagination.asyncAction;
const fetch_edit = _edit.asyncAction;

export const { resetState: resetPostState } = _post.actions;
export const { resetState: resetDeleteState } = _delete.actions; // TODO
export const { resetState: resetSearchState } = _search.actions;

export default reducer;

// get user token
export const post_new_post = (formData) => async (dispatch) => {
  try {
    await dispatch(fetch_new_post(formData));
  } catch (error) {
    console.error(error);
  }
};

// get all posts
export const get_posts = () => async (dispatch) => {
  try {
    await dispatch(fetch_posts());
  } catch (error) {
    console.error(error);
  }
};

// get pagination posts
export const get_posts_pagination = (body) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetch_pagination(body));
    return payload;
  } catch (error) {
    console.error(error);
  }
};

// get post by id
export const get_post = (id) => async (dispatch) => {
  try {
    await dispatch(fetch_post(id));
  } catch (error) {
    console.error(error);
  }
};

// delete post by id
export const delete_post = (id) => async (dispatch) => {
  try {
    await dispatch(fetch_delete(id));
  } catch (error) {
    console.error(error);
  }
};

// edit post
export const edit_post = (body) => async (dispatch) => {
  try {
    await dispatch(fetch_edit(body));
  } catch (error) {
    console.error(error);
  }
};
// like
export const get_like = (id) => async (dispatch) => {
  try {
    await dispatch(fetch_like(id));
  } catch (error) {
    console.error(error);
  }
};

// search
export const get_search = (term) => async (dispatch) => {
  try {
    await dispatch(fetch_search(term));
  } catch (error) {
    console.error(error);
  }
};

// search
export const reset_search = () => async (dispatch) => {
  try {
    await dispatch(resetSearchState());
  } catch (error) {
    console.error(error);
  }
};
