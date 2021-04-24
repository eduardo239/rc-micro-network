import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { post_modal: false },
  reducers: {
    openModal: () => ({ post_modal: true }),
    closeModal: () => ({ post_modal: false }),
    open_pm_modal: () => ({ post_modal: true }),
    close_pm_modal: () => ({ post_modal: false }),
  },
});

export const {
  openModal,
  closeModal,
  open_pm_modal,
  close_pm_modal,
} = slice.actions;
export default slice.reducer;
