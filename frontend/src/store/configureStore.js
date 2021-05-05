import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import ui from './ui';
import localStorage from './middleware/localStorage';
import comment from './comments';
import post from './post';
import modal from './modal';
import user from './user';

const middleware = [...getDefaultMiddleware(), localStorage];
const reducer = combineReducers({ ui, post, modal, user, comment });
const store = configureStore({ reducer, middleware });

export default store;
