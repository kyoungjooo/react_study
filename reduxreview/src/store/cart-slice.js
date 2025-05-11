import { createSlice } from "@reduxjs/toolkit";

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
    },
    removeItemToCart(state, action) {
      const targetItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === targetItem.id
      );
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.itemId !== targetItem.id
        );
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
