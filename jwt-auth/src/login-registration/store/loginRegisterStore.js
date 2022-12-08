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
      console.log("aUserStore=========================>", aUsers);
      aState.user = aUsers.payload;
    },
    storeLoggedUser(aState, aUser) {
      aState.loggedUserDetails = aUser.payload;
    },
    storeWithdrawDetails(aState, aUserData) {
      console.log(aState.user);
      console.log(aUserData.payload);
      const rutvik = current(aState.user);
      const selectUser=current(aState.loggedUserDetails)

      const rutvik2 = rutvik.map((aItem)=> aItem.id === selectUser.id ? {...aItem,history:[{}]}:aItem )
      // console.log(aState.user);

    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
