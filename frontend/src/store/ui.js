import { createSlice } from '@reduxjs/toolkit';
import getLocalStorage from './helpers/getLocalStorage';

const slice = createSlice({
  name: 'theme',
  initialState: getLocalStorage('theme') || 'dark',
  reducers: {
    lightTheme: () => 'light',
    darkTheme: () => 'dark',
  },
});

export const { lightTheme, darkTheme } = slice.actions;
export default slice.reducer;
