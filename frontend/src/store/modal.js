import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: false,
  reducers: {
    openModal: () => true,
    closeModal: () => false,
  },
});

export const { openModal, closeModal } = slice.actions;
export default slice.reducer;
