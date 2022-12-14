import { createSlice } from "@reduxjs/toolkit";

const initialMatchState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialMatchState,
  reducers: {
    isLogin(aState, aFlag) {
      aState.isLogin = aFlag.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
