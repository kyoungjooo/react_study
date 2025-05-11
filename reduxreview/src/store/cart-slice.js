import { createSlice } from "@reduxjs/toolkit";

//장바구니 관리용
const initialCartState = { counter: 0 };
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    increasecount() {},
    decreasecount() {},
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
