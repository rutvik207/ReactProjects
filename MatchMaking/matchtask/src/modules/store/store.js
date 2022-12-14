import { configureStore } from '@reduxjs/toolkit';
import teamReducer from '../components/teams/store/teamStore';
import loginReducer from '../components/login/loginStore/loginStore';
import matchReducer from '../components/matches/store/matchsStore';

const store = configureStore({
  reducer: {
    team: teamReducer,
    login: loginReducer,
    matches: matchReducer,
  },
});

export default store;
