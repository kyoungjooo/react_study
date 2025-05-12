//토글등 사용자 인터페이스 로직용

import { createSlice } from "@reduxjs/toolkit";

const initialCartUIState = { showHide: false, notification: null };
const cartUISlice = createSlice({
  name: "cartUI",
  initialState: initialCartUIState,
  reducers: {
    toggleCart(state) {
      state.showHide = !state.showHide;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
export const cartUIActions = cartUISlice.actions;
export default cartUISlice.reducer;
