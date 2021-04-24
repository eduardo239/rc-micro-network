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

const reducer = combineReducers({
  new: _new_comment.reducer,
});

const fetch_new_comment = _new_comment.asyncAction;

export default reducer;

// get user token
export const post_new_comment = (body) => async (dispatch) => {
  try {
    await dispatch(fetch_new_comment(body));
  } catch (error) {
    console.error(error);
  }
};
