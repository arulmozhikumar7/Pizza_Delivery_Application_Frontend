// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.totalPrice = calculateTotalPrice(action.payload);
    },
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
      state.totalPrice += action.payload.quantity * action.payload.price;
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      const itemToRemove = state.items.find(
        (item) => item._id === itemIdToRemove
      );
      if (itemToRemove) {
        state.totalPrice -= itemToRemove.quantity * itemToRemove.price;
        state.items = state.items.filter((item) => item._id !== itemIdToRemove);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    increaseItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        state.totalPrice += quantity * item.price;
        item.quantity += quantity;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.quantity -= quantity;
        if (item.quantity <= 1) {
          state.totalPrice -= item.quantity * item.price;
          state.items = state.items.filter((item) => item._id !== id);
        }
      }
    },
  },
});

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
