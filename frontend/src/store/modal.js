import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { post_modal: false, pm_modal: false, edit_post_modal: false },
  reducers: {
    openModal: () => ({ post_modal: true }),
    closeModal: () => ({ post_modal: false }),
    open_pm_modal: () => ({ pm_modal: true }),
    close_pm_modal: () => ({ pm_modal: false }),
    open_edit_post: () => ({ post_modal: true, edit_post_modal: true }),
    close_edit_post: () => ({ post_modal: true, edit_post_modal: false }),
  },
});
export const {
  openModal,
  closeModal,
  open_pm_modal,
  close_pm_modal,
  open_edit_post,
  close_edit_post,
} = slice.actions;
export default slice.reducer;
