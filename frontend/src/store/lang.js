import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'lang',
  initialState: 'en',
  reducers: {
    ptLang: () => 'pt',
    enLang: () => 'en',
  },
});

export const { ptLang, enLang } = slice.actions;
export default slice.reducer;
