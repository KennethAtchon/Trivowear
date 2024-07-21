// auth.js
import { createSlice } from '@reduxjs/toolkit';

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuth: false, token: null },
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
