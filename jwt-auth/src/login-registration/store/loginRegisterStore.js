import { createSlice } from "@reduxjs/toolkit";

const initialMatchState = {
  // user: [],
  // loggedUserDetails: "",
  // stateMents: [],
  isLogin: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialMatchState,
  reducers: {
    // storeUsers(aState, aUsers) {
    //   console.log("aUserStore=========================>", aUsers);
    //   aState.user = aUsers.payload;
    // },
    // storeLoggedUser(aState, aUser) {
    //   aState.loggedUserDetails = aUser.payload;
    // },
    isLogin(aState, aFlag) {
      aState.isLogin = aFlag.payload;
    },
    // storeStatement(aState, aUserStatement) {
    //   aState.stateMents = aUserStatement.payload;
    // },
    // addStatement(aState, aUserStatement) {
    //   aState.stateMents = [
    //     ...aState.stateMents,
    //     {
    //       id: aUserStatement.payload.id,
    //       userId: aUserStatement.payload.userId,
    //       date: aUserStatement.payload.date,
    //       type: aUserStatement.payload.type,
    //       amount: aUserStatement.payload.amount,
    //     },
    //   ];
    // },
    // upDateBalance(aState, aUserBalance) {
    //   const user = current(aState.user);
    //   const loggedUser = current(aState.loggedUserDetails);
    //   // let balance = loggedUser.balance + aUserBalance.payload;
    //   const updatedLoggedUser = { ...loggedUser, balance: aUserBalance.payload };
    //   // console.log(balance);
    //   aState.loggedUserDetails = updatedLoggedUser;
    //   const upDatedUser = user.map((aUser) =>

    //     aUser.id === loggedUser.id
    //       ? { ...aUser, balance: aUserBalance.payload}
    //       : aUser
    //   );

    //   aState.user = upDatedUser;
    // },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
