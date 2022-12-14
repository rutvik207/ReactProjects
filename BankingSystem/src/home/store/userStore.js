import { createSlice, current } from "@reduxjs/toolkit";

const initialMatchState = {
  user: [],
  loggedUserDetails: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialMatchState,
  reducers: {
    storeUsers(aState, aUsers) {
      aState.user = aUsers.payload;
    },
    storeLoggedUser(aState, aUser) {
      aState.loggedUserDetails = aUser.payload;
    },
    upDateBalance(aState, aUserBalance) {
      const user = current(aState.user);
      const loggedUser = current(aState.loggedUserDetails);
      const updatedLoggedUser = {
        ...loggedUser,
        balance: aUserBalance.payload,
      };
      aState.loggedUserDetails = updatedLoggedUser;
      const upDatedUser = user.map((aUser) =>
        aUser.id === loggedUser.id
          ? { ...aUser, balance: aUserBalance.payload }
          : aUser
      );
      aState.user = upDatedUser;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
