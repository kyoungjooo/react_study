// import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0, show: true };
const counterSlice = createSlice({
  name: "counter", //slice 이름
  initialState,
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
      state.show = !state.show;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer, //전역 상태를 담당하는 메인 리듀서로서 사용 가능
});

export const counterActions = counterSlice.actions;
/*
const store = configureStore({
  reducer: {counter:counterSlice.reducer}
  규모가 큰 앱에서 상태 slice 가 여러 개라면, 해당 reducer key 값 대신에 객체를 설정해서 그 객체 안에 원하는대로 속성 이름을 정하고 (key 값 설정),
  그 프로퍼티의 값이 또다른 리듀서 함수가 되는 것
});
*/

export default store;
