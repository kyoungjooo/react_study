//토글등 사용자 인터페이스 로직용

import { createSlice } from "@reduxjs/toolkit";

const initialCartUIState = { showHide: false };
const cartUISlice = createSlice({
  name: "cartUI",
  initialState: initialCartUIState,
  reducers: {
    toggleCart(state) {
      state.showHide = !state.showHide;
    },
  },
});
export const cartUIActions = cartUISlice.actions;
export default cartUISlice.reducer;
