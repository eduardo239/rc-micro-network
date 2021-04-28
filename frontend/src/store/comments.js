import { combineReducers } from '@reduxjs/toolkit';
import createAsyncSlice from './helpers/createAsyncSlice';
import get_local_storage from './helpers/getLocalStorage';

const _new_comment = createAsyncSlice({
  name: 'new_comment',
  fetchConfig: (body) => ({
    url: `/api/comments`,
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
const _edit = createAsyncSlice({
  name: 'edit_comment',
  fetchConfig: ({ id, content }) => ({
    url: `/api/comments/${id}`,
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

const _delete_comment = createAsyncSlice({
  name: 'delete_comment',
  fetchConfig: (id) => ({
    url: `/api/comments/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${get_local_storage('token')}`,
      },
    },
  }),
});

const _new_pm = createAsyncSlice({
  name: 'new_pm',
  fetchConfig: (body) => ({
    url: `/api/private`,
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

const _get_pm = createAsyncSlice({
  name: 'get_pm',
  fetchConfig: (userId) => ({
    url: `/api/private/${userId}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${get_local_storage('token')}`,
      },
    },
  }),
});

const _delete_pm = createAsyncSlice({
  name: 'delete_pm',
  fetchConfig: (friendId) => ({
    url: `/api/private`,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${get_local_storage('token')}`,
      },
      body: JSON.stringify(friendId),
    },
  }),
});

const reducer = combineReducers({
  comment: _new_comment.reducer,
  pm: _get_pm.reducer,
});

const fetch_new_comment = _new_comment.asyncAction;
const fetch_delete_comment = _delete_comment.asyncAction;
const fetch_new_pm = _new_pm.asyncAction;
const fetch_get_pm = _get_pm.asyncAction;
const fetch_edit_comment = _edit.asyncAction;
const fetch_delete_pm = _delete_pm.asyncAction;

export default reducer;

// post new comment
export const post_new_comment = (body) => async (dispatch) => {
  try {
    await dispatch(fetch_new_comment(body));
  } catch (error) {
    console.error(error);
  }
};

// delete comment
export const edit_comment = (body) => async (dispatch) => {
  try {
    await dispatch(fetch_edit_comment(body));
  } catch (error) {
    console.error(error);
  }
};

// delete comment
export const delete_comment = (id) => async (dispatch) => {
  try {
    await dispatch(fetch_delete_comment(id));
  } catch (error) {
    console.error(error);
  }
};

// send a pm message
export const send_pm = (body) => async (dispatch) => {
  try {
    await dispatch(fetch_new_pm(body));
  } catch (error) {
    console.error(error);
  }
};

// send a pm message
export const get_pm = (userId) => async (dispatch) => {
  try {
    const response = await dispatch(fetch_get_pm(userId));
    return response;
  } catch (error) {
    console.error(error);
  }
};

// send a pm message
export const delete_pm = (friendId) => async (dispatch) => {
  try {
    const response = await dispatch(fetch_delete_pm(friendId));
    return response;
  } catch (error) {
    console.error(error);
  }
};
