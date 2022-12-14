import { createSlice } from "@reduxjs/toolkit";

const initialMatchState = {
  stateMents: [],
};

const userStatementSlice = createSlice({
  name: "userStateMent",
  initialState: initialMatchState,
  reducers: {
    storeStatement(aState, aUserStatement) {
      aState.stateMents = aUserStatement.payload;
    },
    addStatement(aState, aUserStatement) {
      aState.stateMents = [
        ...aState.stateMents,
        {
          id: aUserStatement.payload.id,
          userId: aUserStatement.payload.userId,
          date: aUserStatement.payload.date,
          type: aUserStatement.payload.type,
          amount: aUserStatement.payload.amount,
        },
      ];
    },
  },
});

export const statementAction = userStatementSlice.actions;
export default userStatementSlice.reducer;
