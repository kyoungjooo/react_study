import { createSlice } from "@reduxjs/toolkit";
import { cartUIActions } from "./ui-slice";

//장바구니 관리용
const initialCartState = { items: [], totalQuantity: 0 };
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: 1,
          price: newItem.price,
          total: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + existingItem.price;
      }
      state.totalQuantity++;
    },
    removeItemToCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }
      state.totalQuantity--;
    },
  },
});

export const sendCartData = (cart) => {
  //즉시 비동기 작업을 수행하는 것이 아니라, '비동기 작업을 담은 함수'를 반환
  return async (dispatch) => {
    dispatch(
      cartUIActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending cart data...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch("", {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error("failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        cartUIActions.showNotification({
          status: "success",
          title: "success!",
          message: "sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        cartUIActions.showNotification({
          status: "error",
          title: "error!",
          message: "sending cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
