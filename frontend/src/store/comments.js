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

const reducer = combineReducers({
  comment: _new_comment.reducer,
  pm: _get_pm.reducer,
});

const fetch_new_comment = _new_comment.asyncAction;
const fetch_new_pm = _new_pm.asyncAction;
const fetch_get_pm = _get_pm.asyncAction;

export default reducer;

// post new comment
export const post_new_comment = (body) => async (dispatch) => {
  try {
    await dispatch(fetch_new_comment(body));
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
    await dispatch(fetch_get_pm(userId));
  } catch (error) {
    console.error(error);
  }
};
