import { configureStore } from "@reduxjs/toolkit";
import cartUIReducer from "./ui-slice";
import cartReducer from "./cart-slice";

const store = configureStore({
  reducer: { ui: cartUIReducer, cart: cartReducer },
});
export default store;
