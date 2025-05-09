import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCount: true };
const counterSlice = createSlice({
  name: "counter", //slice 이름
  initialState: initialCounterState,
  reducers: {
    //어떤 액션을 했는지에 따라 메서드가 자동으로 호출됨
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggle(state) {
      state.show = !state.showCount;
    },
  },
});
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
