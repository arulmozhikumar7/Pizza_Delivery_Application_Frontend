import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      const itemToRemove = state.items.find(
        (item) => item._id === itemIdToRemove
      );
      if (itemToRemove) {
        state.items = state.items.filter((item) => item._id !== itemIdToRemove);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        console.log(item.quantity);
        item.quantity += quantity;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.quantity -= quantity;
        if (item.quantity <= 1) {
          state.items = state.items.filter((item) => item._id !== id);
        }
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
