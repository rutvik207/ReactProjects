import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../login-registration/store/loginRegisterStore';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;