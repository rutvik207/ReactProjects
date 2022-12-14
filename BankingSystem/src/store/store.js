import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../home/store/userStore";
import stateMentReducer from "../dashboard-history/store/statementStore";
import loginReducer from "../login-registration/store/loginRegisterStore";
const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    statement: stateMentReducer,
  },
});

export default store;
