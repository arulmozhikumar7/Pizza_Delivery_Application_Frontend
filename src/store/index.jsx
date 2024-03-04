// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import { loadState, saveState } from "../storage/localStorage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  preloadedState: persistedState, // Load state from local storage
});

store.subscribe(() => {
  saveState({
    user: store.getState().user, // Save only the user slice
    cart: store.getState().cart, // Save only the cart slice
  });
});

export default store;
