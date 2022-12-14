import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const userIsLoggedIn = !!initialToken;

const initialAuthState = {
  isLoggedIn: userIsLoggedIn,
};

const loginSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(aState, aToken) {
      localStorage.setItem('token', aToken.payload);
      aState.isLoggedIn = true;
    },
  },
});

export const authActions = loginSlice.actions;

export default loginSlice.reducer;