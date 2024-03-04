import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  userId: null, // Add userId field to the initial state
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId; // Store user ID upon successful login
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null; // Clear user ID upon logout
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
